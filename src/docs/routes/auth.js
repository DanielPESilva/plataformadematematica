import commonResponses from "../schemas/commonResponses.js";

const authRoutes = {
    "/login": {
        post: {
            tags: ["Auth"],
            summary: "Realiza login",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "john@gmail.com" },
                                password: { type: "string", example: "ABCDabcd1234" }
                            },
                            required: ["email", "password"]
                        }
                    }
                }
            },
            responses: {
                200: commonResponses[200]("#/components/schemas/RespostaLogin"),
                400: commonResponses[400](),
                401: commonResponses[401]()
            }
        }
    }
};

export default authRoutes;