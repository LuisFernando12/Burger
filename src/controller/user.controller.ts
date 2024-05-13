import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { IUserCreate, IUserUpdate } from "src/interface/user.interface";
import { UserService } from "src/service/user.service";
import * as bcrypt from 'bcrypt';
import { AuthGuard } from "src/guard/auth.guard";
@Controller("/user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    private async encryptPassword(password:string):Promise<string>{
        const saltOrRounds:number  = 10;
        password = await bcrypt.hash(password, saltOrRounds);
        return password;
    }

    @Post()
    async create(@Body() data: IUserCreate): Promise<string>{
        data.password = await this.encryptPassword(data.password)     
        try {          
            await this.userService.create(data);
            return "ok";
        } catch (error) {           
            if (error.meta && error.meta.target) {
                throw new BadRequestException(`Verifique os dados enviados e tente novamente`)
            }
        }
    }

    @UseGuards(AuthGuard)
    @Get("/:id")
    async get(@Param('id') id: number): Promise<any> {
        id = Number(id)
        const userDB = await this.userService.get(id);        
        if (!userDB || !userDB.active) {
            throw new NotFoundException()
        }
        return userDB;
    }
    
    @UseGuards(AuthGuard)
    @Get("/")
    async find(): Promise<User[]> {
        const userDB = await this.userService.find();
        
        if (userDB.length == 0) {
            return []
        }
        
        return userDB;
    }
    
    @UseGuards(AuthGuard)
    @Put("/:id")
    async update(@Param('id') id: number, @Body() data: IUserUpdate): Promise<string> {
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
    
    @UseGuards(AuthGuard)
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
