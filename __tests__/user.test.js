//process.env.NODE_ENV = "test";
const {sequelize}=require("../databse/db.config")
const request = require("supertest")
const app = require("../server");

//import user model
const { User } = require("../databse/models/user.model");

beforeAll(async () => {
//   console.log("before all");
//   await sequelize.query(
//     "CREATE TABLE students (user_id int PRIMARY KEY auto_increment, name varchar(200),email varchar(200),password varchar(100),role varchar(100),status tinyint(1))"
//   );
});

beforeEach(async () => {
  // seed with some data
   //await sequelize.query("INSERT INTO students(name,email,password,role,status)  VALUES ('Ravi','ravi@gmail.com','kjhg',1)");
});

afterEach(async () => {
//   await sequelize.query("DELETE FROM students");
});

afterAll(async () => {
//   await sequelize.query("DROP TABLE students");
        
});

///////////////////////////////////////////////////// User API //////////////////////////////////////////////////////

//test for registration
test("Testing Registration route",async()=>{
    let response=await request(app).post("/user/register").send({"name":"laxman","email":"laxmanarao123344@westagilelabs.com","password":"laxman"})
    console.log(response.status)
    await User.destroy({where:{
        email:"laxmanarao123344@westagilelabs.com"
    }})
    expect(response.status).toBe(201)
})

//test for sucessfull login
test("testing login with valid credentials",async()=>{
    let result=await request(app).post("/user/login").send({"email":"admin","password":"admin"})
    //console.log(result.body)
    expect(result.body.token).not.toBe(undefined)
    expect(result.status).toBe(200)
})

//Test for failed login
test("testing login with invalid credentials",async()=>{
    let result=await request(app).post("/user/login").send({"email":"admin","password":"adminpassword"})
    console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------",result.body)
    expect(result.body.token).toBe(undefined)
    expect(result.status).toBe(401)
})

 ////////////////////////////////////////////// Testing Super admin API //////////////////////////////////////////////////////

//Get all registered users
test("It should return all registered users",async()=>{
    let response=await request(app).get("/super-admin/role/users")
    expect(response.status).toBe(200)
})

// Test assign role Assign role
test("Role assignment should work",async()=>{
    await User.create({"name":"laxman","email":"laxmanarao123344@westagilelabs.com","password":"laxman"})
    let response=await request(app).post("/super-admin/role/user/laxmanarao123344@westagilelabs.com")
    .send({"role":"admin"})
    .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluIiwicm9sZSI6InN1cGVyX2FkbWluIiwiY3JlYXRlZEF0IjoiMjAyMy0wMy0xMFQxODozMTozNS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wMy0xMFQxODozMTozNS4wMDBaIiwiaWF0IjoxNjc4Nzk2NDI0fQ.Csdabq-d-68W3X7b_Arx-Oehu2jHutiGFxPs_ms1ew4")
    await User.destroy({where:{
        email:"laxmanarao123344@westagilelabs.com"
    }})
    expect(response.status).toBe(200)
    expect(response.body.updateCount).not.toBe(0)
})

///////////////////////////////////////////////////// Testing admin API /////////////////////////////////////

//Testing get projects by admin

test("This route should return projects",async()=>{
    let response=await request(app).get("/admin/projects")
                .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibGF4bWFuIiwiZW1haWwiOiJsYWtzaG1hbmE1Mjk2QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImNyZWF0ZWRBdCI6IjIwMjMtMDMtMTBUMTg6NDM6MTIuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDMtMTRUMDQ6NDY6NTcuMDAwWiIsImlhdCI6MTY3ODc5OTM0NH0.2pH3jCKK2hsiiOSCRHB7kAP-u-yoOrCAAWlaff8Hw6M")
            expect(response.status).toBe(200)
})


///////////////////////////////////////////////////// Project manager API ////////////////////////////////////////

//Get all projects

test("This route should return projects",async()=>{
    let response=await request(app).get("/project-manager/projects")
                .set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicG0xIiwiZW1haWwiOiJwbTFAd2VzdGFnaWxlbGFicy5jb20iLCJyb2xlIjoicHJvamVjdF9tYW5hZ2VyIiwiY3JlYXRlZEF0IjoiMjAyMy0wMy0xM1QwNDozMjoxMy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wMy0xM1QwNDozNDozNy4wMDBaIiwiaWF0IjoxNjc4Nzk5NjcyfQ.6tdQHtmpeAY0btmk4nrTCu8neq6dhc9u-vpKEbIuoKI")
            expect(response.status).toBe(200)
})