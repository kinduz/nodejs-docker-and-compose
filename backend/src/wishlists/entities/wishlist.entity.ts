import {
  ALLOWED_URL_PROTOCOLS,
  BaseEntityWithIdAndDates,
  MIN_LENGTH_ONE_SYMBOL,
} from '../../shared';
import { IsOptional, IsUrl, Length } from 'class-validator';
import { Column, ManyToMany, ManyToOne, JoinTable, Entity } from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';
import {
  MAX_WISHLIST_DESCRIPTION_LENGTH,
  MAX_WISHLIST_NAME_LENGTH,
} from './constants/wishlist-entity.constants';

@Entity()
export class Wishlist extends BaseEntityWithIdAndDates {
  @Length(MIN_LENGTH_ONE_SYMBOL, MAX_WISHLIST_NAME_LENGTH)
  @Column({
    length: MAX_WISHLIST_NAME_LENGTH,
  })
  name: string;

  @IsOptional()
  @Length(MIN_LENGTH_ONE_SYMBOL, MAX_WISHLIST_DESCRIPTION_LENGTH)
  @Column({ length: MAX_WISHLIST_DESCRIPTION_LENGTH, nullable: true })
  description: string;

  @IsOptional()
  @Column()
  @IsUrl({
    protocols: ALLOWED_URL_PROTOCOLS,
  })
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: User;

  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  @JoinTable()
  items: Wish[];
}
