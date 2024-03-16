// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';



export class CarDriveEvent implements flatbuffers.IUnpackableObject<CarDriveEventT> {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):CarDriveEvent {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsCarDriveEvent(bb:flatbuffers.ByteBuffer, obj?:CarDriveEvent):CarDriveEvent {
  return (obj || new CarDriveEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsCarDriveEvent(bb:flatbuffers.ByteBuffer, obj?:CarDriveEvent):CarDriveEvent {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new CarDriveEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

name():string|null
name(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
name(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

static startCarDriveEvent(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addName(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, nameOffset, 0);
}

static endCarDriveEvent(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createCarDriveEvent(builder:flatbuffers.Builder, nameOffset:flatbuffers.Offset):flatbuffers.Offset {
  CarDriveEvent.startCarDriveEvent(builder);
  CarDriveEvent.addName(builder, nameOffset);
  return CarDriveEvent.endCarDriveEvent(builder);
}

unpack(): CarDriveEventT {
  return new CarDriveEventT(
    this.name()
  );
}


unpackTo(_o: CarDriveEventT): void {
  _o.name = this.name();
}
}

export class CarDriveEventT implements flatbuffers.IGeneratedObject {
constructor(
  public name: string|Uint8Array|null = null
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const name = (this.name !== null ? builder.createString(this.name!) : 0);

  return CarDriveEvent.createCarDriveEvent(builder,
    name
  );
}
}
