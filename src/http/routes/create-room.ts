import type {FastifyPluginCallbackZod} from 'fastify-type-provider-zod';
import {z} from 'zod/v4'
import {schema} from "../../db/schema/index.ts";
import {db} from "../../db/connection.ts";

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
	app.post(
		'/rooms',
		{
			schema: {
				body: z.object({
					name: z.string().min(1),
					description: z.string().optional()
				})
			},
		},
		async (request, reply) => {
			console.log('response.body', request.body)
			const {name, description} = request.body;

			const result = await db.insert(schema.rooms).values({
				name: name, 
				description: description
			}).returning()

			console.log('result', result)

			const insertedRoom = result[0]

			if (!insertedRoom) {
				throw new Error('Failing to create new room.')
			}

			return reply.status(201).send({roomId: insertedRoom.id})
		}
	)
};
