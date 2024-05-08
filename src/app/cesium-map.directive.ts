import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { Viewer } from 'cesium';

@Directive({
  selector: '[appCesiumMap]'
})
export class CesiumMapDirective implements OnChanges {

  viewer: any;
  
  startXY: Array<number> = [52.196418, 55.834534];
  countXY: Array<number> = [10, 20];
  step = [0.031, -0.026];

  alpha: number = 0.3;
  prewId: string = '';
  @Input() activate = false;

  constructor(private el: ElementRef) {
    this.viewer = new Cesium.Viewer(this.el.nativeElement, {
      baseLayerPicker: false,
      fullscreenButton: false,
      homeButton: false,
      infoBox: false,
      timeline: false,
      selectionIndicator: false,
      navigationHelpButton: false,
      animation: false,
      geocoder: false,
      scene3DOnly: true
    });
    this.viewer._cesiumWidget._creditContainer.style.display = "none";
    this.createPoligon(this.viewer, this.activate);
    this.viewer.flyTo(this.viewer.entities);

    let scene = this.viewer.scene;
    let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction((movement: any) => {
      if(this.activate) {
        let pickedFeature = this.viewer.scene.pick(movement.endPosition);
  
        if(this.prewId !== '') {
          let el: any = this.viewer.entities.getById(this.prewId);
          el.rectangle.material = this.changeColor(el.rectangle.material, false);
          el.rectangle.outline = false;
        }
  
        this.prewId = pickedFeature?.id?._id ? pickedFeature?.id?._id : '';
        
        if(Cesium.defined(pickedFeature)) {
          var picked: any = pickedFeature.id;
          picked.rectangle.material = this.changeColor(picked.rectangle.material, true);
          picked.rectangle.outline = true;
        }
        scene.requestRender();
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }

  createPoligon(view: Viewer, activate: boolean) {
    if(activate) {
      for (let i = 0; i < this.countXY[0]; i++) {
        for (let j = 0; j < this.countXY[1]; j++) {
          view.entities.add({
            name: `box_${i}${j}`,
            rectangle: {
              coordinates: Cesium.Rectangle.fromDegrees(
                this.startXY[0] + (j * this.step[0]),
                (this.startXY[1] + this.step[1]) + (i * this.step[1]),
                (this.startXY[0] + this.step[0]) + (j * this.step[0]),
                this.startXY[1] + (i * this.step[1])
              ),
              material: Cesium.Color.fromRandom({ alpha: this.alpha }),
              //rotation: Cesium.Math.toRadians(45), // вращение
              extrudedHeight: 50, //высота объекта
              height: 10, //высота расположения
              outline: false, // контур
              outlineColor: Cesium.Color.RED, //цвет контура
            },
          });
        }
      }
    } else {
      view.entities.add({
        name: `box_main`,
        rectangle: {
          coordinates: Cesium.Rectangle.fromDegrees(
            this.startXY[0] ,
            this.startXY[1] + (this.countXY[0] * this.step[1]),
            this.startXY[0] + (this.countXY[1] * this.step[0]),
            this.startXY[1]
          ),
          material: Cesium.Color.WHITE.withAlpha(this.alpha),
          //rotation: Cesium.Math.toRadians(45), // вращение
          extrudedHeight: 50, //высота объекта
          height: 10, //высота расположения
          outline: false, // контур
          outlineColor: Cesium.Color.RED, //цвет контура
        },
      })
    }
  }

  ngOnChanges() {
    this.viewer.entities.removeAll();
    this.viewer.destroy;
    this.prewId = '';
    this.createPoligon(this.viewer, this.activate);
  }

  changeColor(mat: any, isDown: boolean) {
    let res = mat._color._value;
    res.alpha = isDown ? 0.6 : this.alpha;
    return res;
  }

}
