import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsObject } from 'class-validator';
import JSONType from 'graphql-type-json';

@InputType()
export class ExecuteJobInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => JSONType)
  @IsObject()
  @IsNotEmpty()
  data: object;
}
