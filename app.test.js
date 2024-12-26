// ./app.test.js
import request from "supertest";
import app from "./app";

describe("POST /users", () => {

    describe("given a username and password", () => {
        // should save the username and password in the database
        // should respond with a json object containg the user id

        // should respond with a 200 status code
        test("should respond with a 200 status code", async () => {

            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            })

            expect(response.statusCode).toBe(200)
        });

        // should specify json in the content type header
        test("should specify json in the content type header", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            })

            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        })

        test("response has userId", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "password"
            })

            expect(response.body.userId).toBeDefined();
        });
    });

    describe("when the username and password is missing", () => {
        // should respond with a 400 status code
        test("should respond with a 400 status code", async () => {
            const bodyDat = [
                { username: "username" },
                { password: "password" },
                {}
            ];

            for (const body of bodyDat) {
                const response = await request(app).post("/users").send(body);
                expect(response.statusCode).toBe(400);
            }
        })
    });
});