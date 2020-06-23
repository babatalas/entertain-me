const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../redis");
const tvSeriesAPI = process.env.TV_SERIES_SERVICE_API + "/tv-series";

const typeDefs = gql`
  type TvSeries {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  input UpdateTvSeries {
    _id: ID!
    data: InputTvSeries
  }

  input InputTvSeries {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: [String]!
  }

  extend type Query {
    tvSeries: [TvSeries]
    getTvSeries(_id: ID!): TvSeries
  }

  extend type Mutation {
    createTvSeries(tvSeries: InputTvSeries): TvSeries
    updateTvSeries(tvSeries: UpdateTvSeries): TvSeries
    deleteTvSeries(_id: ID!): DeleteResponse
  }
`;

const resolvers = {
  Query: {
    tvSeries: async () => {
      try {
        const tvSeriesInCache = await redis.get("tvSeries");
        if (tvSeriesInCache) return JSON.parse(tvSeriesInCache);

        const { data: tvSeries } = await axios.get(tvSeriesAPI);
        redis.set("tvSeries", JSON.stringify(tvSeries));
        return tvSeries;
      } catch (error) {
        return error;
      }
    },
    getTvSeries: async (_, args) => {
      try {
        const { _id } = args;
        const tvSeriesByIdInCache = await redis.get("tvSeries:" + _id);
        if (tvSeriesByIdInCache) return JSON.parse(tvSeriesByIdInCache);

        const { data: tvSeries } = await axios.get(`${tvSeriesAPI}/${_id}`);
        redis.set("tvSeries:" + _id, JSON.stringify(tvSeries));
        return tvSeries;
      } catch (error) {
        return error;
      }
    },
  },

  Mutation: {
    createTvSeries: async (_, args) => {
      try {
        const { tvSeries: newTvSeries } = args;
        const { data: tvSeries } = await axios.post(tvSeriesAPI, newTvSeries);
        redis.del("tvSeries");
        redis.set("tvSeries:" + movie._id, JSON.stringify(tvSeries));
        return tvSeries;
      } catch (error) {
        return error;
      }
    },

    updateTvSeries: async (_, args) => {
      try {
        const { _id, data } = args.tvSeries;
        const {
          data: { value: updatedTvSeries },
        } = await axios.put(`${tvSeriesAPI}/${_id}`, data);
        if (updatedTvSeries) {
          redis.del("tvSeries");
          redis.set("tvSeries:" + _id, JSON.stringify(updatedTvSeries));
        }
        return updatedTvSeries;
      } catch (error) {
        return error;
      }
    },

    deleteTvSeries: async (_, args) => {
      try {
        const { _id } = args;
        const { data: response } = await axios.delete(`${tvSeriesAPI}/${_id}`);
        if (response.n) {
          redis.del("tvSeries:" + _id);
          redis.del("tvSeries");
        }
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
