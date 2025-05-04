import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '@sm/nestjs';


@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;
}
