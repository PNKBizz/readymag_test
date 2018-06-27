<template lang="pug">
    .container(
        :style="styleObj"
    )
        slot
        .container__corner.container__corner--top-right(
            v-if="!lockRatio"
            @mousedown.stop.prevent="startResize"
        )
        .container__corner.container__corner--top-left(
            @mousedown.stop.prevent="startResize"
        )
        .container__corner.container__corner--bottom-left(
            v-if="!lockRatio"
            @mousedown.stop.prevent="startResize"
        )
        .container__corner.container__corner--bottom-right(
            @mousedown.stop.prevent="startResize"
        )
        .container__corner.container__corner--move(
            @mousedown.stop.prevent="startMove"
        )
</template>

<script>
export default {
  props: {
    topValue: {
      type: [String, Number],
      default: 0
    },
    widthValue: {
      type: [String, Number],
      default: 200
    },
    heightValue: {
      type: [String, Number],
      default: 200
    },
    lockRatio: {
      type: Boolean,
      default: false
    },
    itemId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      top: this.topValue,
      left: 0,
      right: this.widthValue,
      bottom: this.heightValue + this.topValue,
      inMoveAction: false,
      inResizeAction: false,
      moveCoords: {},
      resizeCoords: {},
      xDirection: "",
      yDirection: ""
    };
  },
  computed: {
    styleObj() {
      return {
        top: `${this.top}px`,
        left: `${this.left}px`,
        width: `${this.width}px`,
        height: `${this.height}px`
      };
    },
    width() {
      return this.right - this.left;
    },
    height() {
      return this.bottom - this.top;
    }
  },
  mounted: function() {
    document.documentElement.addEventListener("mousemove", this.moveHandler);
    document.documentElement.addEventListener("mouseup", this.upHandler);
    document.documentElement.addEventListener("mouseleave", this.upHandler);
  },

  beforeDestroy: function() {
    document.documentElement.removeEventListener("mousemove", this.moveHandler);
    document.documentElement.removeEventListener("mouseup", this.upHandler);
    document.documentElement.removeEventListener("mouseleave", this.upHandler);
  },
  methods: {
    moveHandler(e) {
      if (this.inMoveAction) this.move(e);
      if (this.inResizeAction) this.resize(e);
    },
    upHandler() {
      this.inMoveAction = false;
      this.inResizeAction = false;
      this.$emit("drop", { id: this.itemId, bottom: this.bottom });
    },
    startMove(e) {
      const { x, y } = e;
      this.moveCoords = { x, y };
      this.inMoveAction = true;
    },
    move(e) {
      if (this.inMoveAction) {
        const { x, y } = e;
        const xOffset = x - this.moveCoords.x;
        const yOffset = y - this.moveCoords.y;
        this.moveCoords = { x, y };
        this.top += yOffset;
        this.bottom += yOffset;
        this.left += xOffset;
        this.right += xOffset;
      }
    },
    startResize(e) {
      const { x, y } = e;
      this.resizeCoords = { x, y };
      this.inResizeAction = true;
      const [yDirection, xDirection] = e.target.className
        .split("--")[1]
        .split("-");
      this.yDirection = yDirection;
      this.xDirection = xDirection;
    },
    resize(e) {
      if (this.inResizeAction) {
        const { x, y } = e;
        const xOffset = x - this.resizeCoords.x;
        const yOffset = y - this.resizeCoords.y;
        this.resizeCoords = { x, y };
        let lockedOffset;
        if (this.lockRatio) {
          lockedOffset =
            Math.abs(xOffset) >= Math.abs(yOffset) ? xOffset : yOffset;
        }
        this[this.yDirection] += lockedOffset || yOffset;
        this[this.xDirection] += lockedOffset || xOffset;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  background: gray;
  border: 1px solid white;

  &__corner {
    background: #ddd;
    width: 5px;
    height: 5px;
    position: absolute;

    &--top-left {
      top: 0;
      left: 0;
      cursor: nwse-resize;
    }

    &--top-right {
      top: 0;
      right: 0;
      cursor: nesw-resize;
    }

    &--bottom-right {
      bottom: 0;
      right: 0;
      cursor: nwse-resize;
    }

    &--bottom-left {
      left: 0;
      bottom: 0;
      cursor: nesw-resize;
    }

    &--move {
      top: 0;
      left: calc(50% - 3px);
      cursor: move;
    }
  }
}
</style>

