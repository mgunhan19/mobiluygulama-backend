import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';//typeorm'dan Entity, PrimaryGeneratedColumn ve Column dekoratörlerini içe aktarıyoruz

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: 0 })
  highScore!: number; // Yarışma puanını kaydetmek için yeni bir alan ekledik

  @Column({ default: 1 })
  level!: number; // Kullanıcının seviyesini tutmak için yeni bir alan ekledik
}
