import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/",
    {
      schema: {
        response: {
          200: {
            description: "Hello world",
            type: "object",
            properties: {
              hello: { type: "string" },
            },
            required: ["hello"],
          },
        },
      },
    },
    function (_, reply) {
      reply.send({ hello: "world" });
    },
  );
};

export default root;
