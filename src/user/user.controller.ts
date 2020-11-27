import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";

@Controller("user")
export class UserController {
  @Get()
  findAll(): string {
    return "all user";
  }

  @Get(":id")
  find(@Param("id") id: string): string {
    return `Return a #${id} user`;
  }

  @Post()
  create(@Body() createCatDTO:any){
      return "Create a user"
  }

  @Put(":id")
  update(@Body() updateCatDTO:any,@Param("id") id:string){
      return `Update a #${id} user`;
  }

  @Delete(":id")
  delete(@Param("id") id:string):string{
      return `Delete a #${id} user`;
  }
}
