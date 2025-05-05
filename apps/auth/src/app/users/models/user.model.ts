import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '@sm/graphql';

@ObjectType()
export class User extends AbstractModel {
  @Field()
  email: string;
}
