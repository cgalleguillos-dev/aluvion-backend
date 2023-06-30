import { PartialType } from '@nestjs/mapped-types';
import { CreateComposeComponentDto } from './create-compose-component.dto';

export class UpdateComposeComponentDto extends PartialType(CreateComposeComponentDto) {}
