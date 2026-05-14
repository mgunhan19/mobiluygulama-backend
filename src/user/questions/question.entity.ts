// src/user/questions/question.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column()
  optionA!: string;

  @Column()
  optionB!: string;

  @Column()
  optionC!: string;

  @Column()
  optionD!: string;

  @Column()
  correctAnswer!: string;

  @Column({ default: 1 }) // Yeni eklenen sütun: Sorunun seviyesi
  level!: number;
}