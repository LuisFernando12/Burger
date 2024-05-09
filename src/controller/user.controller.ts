import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUser, UpdateUser } from "src/interface/user.interface";
import { UserService } from "src/service/user.service";
import * as bcrypt from 'bcrypt';
@Controller("/user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    private async encryptPassword(password:string):Promise<string>{
        const saltOrRounds:number  = 10;
        password = await bcrypt.hash(password, saltOrRounds);
        return password;
    }

    @Post()
    async create(@Body() data: CreateUser): Promise<string>{
        data.password = await this.encryptPassword(data.password)
        console.log(data);
        
        try {
            await this.userService.create(data);
            return "ok";
        } catch (error) {
            if (error.meta && error.meta.target) {
                throw new BadRequestException(`Verifique os dados enviados e tente novamente`)
            }
        }
    }

    @Get("/:id")
    async get(@Param('id') id: number): Promise<User> {
        id = Number(id)
        const userDB = await this.userService.get({ id })
        if (!userDB || !userDB.active) {
            throw new NotFoundException()
        }
        return userDB;
    }

    @Get("/")
    async find(): Promise<User[]> {
        const userDB = await this.userService.find();

        if (userDB.length == 0) {
            return []
        }

        return userDB;
    }

    @Put("/:id")
    async update(@Param('id') id: number, @Body() data: UpdateUser): Promise<string> {
        id = Number(id)
        try {
            await this.userService.update(id, data)
            return "ok"
        } catch (error) {
            if (error.meta && error.meta.cause) {
                throw new InternalServerErrorException(error.meta.cause)
            }
            throw new InternalServerErrorException()
        }
    }

    @Delete("/:id")
    async delete(@Param('id') id: number): Promise<string> {
        id = Number(id)
        try {
            await this.userService.delete(id);   
            return "ok"
        } catch (error) {
            if (error.meta && error.meta.cause){
                throw new InternalServerErrorException(error.meta.cause)
            }
            throw new InternalServerErrorException()
        }
    }
}
