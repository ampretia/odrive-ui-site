// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { TrackPiece, TrackPieceT } from '../drive/track-piece.js';


export class LayoutEvent implements flatbuffers.IUnpackableObject<LayoutEventT> {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):LayoutEvent {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsLayoutEvent(bb:flatbuffers.ByteBuffer, obj?:LayoutEvent):LayoutEvent {
  return (obj || new LayoutEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsLayoutEvent(bb:flatbuffers.ByteBuffer, obj?:LayoutEvent):LayoutEvent {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new LayoutEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

track(index: number, obj?:TrackPiece):TrackPiece|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new TrackPiece()).__init(this.bb!.__vector(this.bb_pos + offset) + index * 8, this.bb!) : null;
}

trackLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startLayoutEvent(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addTrack(builder:flatbuffers.Builder, trackOffset:flatbuffers.Offset) {
  builder.addFieldOffset(0, trackOffset, 0);
}

static startTrackVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(8, numElems, 4);
}

static endLayoutEvent(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createLayoutEvent(builder:flatbuffers.Builder, trackOffset:flatbuffers.Offset):flatbuffers.Offset {
  LayoutEvent.startLayoutEvent(builder);
  LayoutEvent.addTrack(builder, trackOffset);
  return LayoutEvent.endLayoutEvent(builder);
}

unpack(): LayoutEventT {
  return new LayoutEventT(
    this.bb!.createObjList<TrackPiece, TrackPieceT>(this.track.bind(this), this.trackLength())
  );
}


unpackTo(_o: LayoutEventT): void {
  _o.track = this.bb!.createObjList<TrackPiece, TrackPieceT>(this.track.bind(this), this.trackLength());
}
}

export class LayoutEventT implements flatbuffers.IGeneratedObject {
constructor(
  public track: (TrackPieceT)[] = []
){}


pack(builder:flatbuffers.Builder): flatbuffers.Offset {
  const track = builder.createStructOffsetList(this.track, LayoutEvent.startTrackVector);

  return LayoutEvent.createLayoutEvent(builder,
    track
  );
}
}