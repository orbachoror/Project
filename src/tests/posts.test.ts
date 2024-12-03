import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import { Express } from "express";  

let app:Express;

beforeAll(async()=>{
   app= await initApp();
   console.log('beforeAll');
    await postModel.deleteMany();    
});

afterAll(async()=>{
    console.log('afterAll');
    await mongoose.connection.close();
});

let postId="";
const testPost={  
    title:"Test title",
    content:"First Test",
    owner: "Or",
};

const invalidPost={  
    title:"InvalidTest title",
    content:"First Test"
};

describe("Posts test suite", ()=>{
    test("Post test get all post", async()=>{
        const response=await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Test adding new post",async()=>{  
        const response=await request(app).post("/posts").send(testPost);
        expect(response.statusCode).toBe(201);  
        expect(response.body.title).toBe(testPost.title);
        expect(response.body.content).toBe(testPost.content);
        expect(response.body.owner).toBe(testPost.owner);
        postId=response.body._id;
    });

    test("Test adding invalid post",async()=>{  
        const response=await request(app).post("/posts").send(invalidPost);
        expect(response.statusCode).toBe(400);
    });


    test("Test get all posts after adding", async()=>{
        const response=await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test("Test get post by owner", async()=>{  
        const response=await request(app).get("/posts?owner=" + testPost.owner);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].owner).toBe(testPost.owner);
    });

    test("Test get post by id", async()=>{
        const response=await request(app).get("/posts/"+ postId);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(postId);
    });
  
    test("Test get post by id", async()=>{
        const response=await request(app).get("/posts/"+ postId +5);
        expect(response.statusCode).toBe(400);
    });

    test("Test get post by fail id", async()=>{
        const response=await request(app).get("/posts/6745df242f1b06026b3201f8");
        expect(response.statusCode).toBe(404);
    });
  
});

