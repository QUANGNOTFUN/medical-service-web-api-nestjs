import { Module } from "@nestjs/common";

import { LeaveResolver } from "./leave.resolver";
import { LeaveService } from "./leave.service";
import { PrismaService } from '../prisma/prisma.service';


@Module({
  providers: [LeaveResolver, LeaveService, PrismaService],
  exports: [LeaveService],
})
export class LeaveModule {}
