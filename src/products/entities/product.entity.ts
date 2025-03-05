import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['codigo'])
export class Product {
  @PrimaryColumn()
  codigo: string;

  @Column()
  nome: string;

  @Column({ nullable: true })
  codigo_barras: string;

  @Column('decimal', { precision: 10, scale: 2 })
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;
}
