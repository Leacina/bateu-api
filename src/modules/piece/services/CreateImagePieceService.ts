import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/uploadImagePiece';
import { injectable, inject } from 'tsyringe';
import IImagePieceRepository from '../repositories/IImagePieceRepository';
import ImagePiece from '../infra/typeorm/entities/ImagePiece';

interface IRequest {
  piece_id: number;
  files: string[];
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('ImagePieceRepository')
    private imagePieceRepository: IImagePieceRepository,
  ) {}

  public async execute({ piece_id, files }: IRequest): Promise<ImagePiece[]> {
    const images = await this.imagePieceRepository.findByPieceID(
      Number(piece_id),
    );
    console.log('Salvando imagens...');
    images.map(async image => {
      if (image.imagem) {
        const pieceFilePath = path.join(uploadConfig.directory, image.imagem);
        const pieceAvatarFileExists = await fs.promises.stat(pieceFilePath);

        if (pieceAvatarFileExists) {
          await fs.promises.unlink(pieceFilePath);
        }
      }
    });

    await this.imagePieceRepository.deleteByPieceId(Number(piece_id));

    const newImages = new Array<ImagePiece>();

    files.map(async file => {
      const image = await this.imagePieceRepository.create({
        id_produto: Number(piece_id),
        imagem: file,
      });

      return newImages.push(image);
    });

    return newImages;
  }
}

export default UpdateUserAvatarService;
