// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tile extends cc.Component {

    @property(cc.Sprite)
    bg:cc.Sprite = null!;
    @property(cc.Label)
    txtNum:cc.Label = null!;

    public init(num:number){
        this.txtNum.string = num.toString();
        this.setColor(num);
    }

    private setColor(num:number) {
        switch (num) {
            case Math.pow(2,1):
                this.bg.node.color = new cc.Color(238,228,218);
                break;
            case Math.pow(2,2):
                this.bg.node.color = new cc.Color(237,224,200);
                break;
            case Math.pow(2,3):
                this.bg.node.color = new cc.Color(242,177,121);
                break;
            case Math.pow(2,4):
                this.bg.node.color = new cc.Color(245,149,99);
                break;
            case Math.pow(2,5):
                this.bg.node.color = new cc.Color(246,124,95);
                break;
            case Math.pow(2,6):
                this.bg.node.color = new cc.Color(246,94,59);
                break;
            case Math.pow(2,7):
                this.bg.node.color = new cc.Color(237,206,115);
                break;
            case Math.pow(2,8):
                this.bg.node.color = new cc.Color(236,201,97);
                break;
            case Math.pow(2,9):
                this.bg.node.color = new cc.Color(238,199,80);
                break;
            case Math.pow(2,10):
                this.bg.node.color = new cc.Color(239,196,65);
                break;
            case Math.pow(2,11):
                this.bg.node.color = new cc.Color(239,193,46);
                break;
            case Math.pow(2,12):
                this.bg.node.color = new cc.Color(255,60,61);
                break;
            case Math.pow(2,13):
                this.bg.node.color = new cc.Color(255,30,32);
                break;
            default:
                this.bg.node.color = new cc.Color(255,30,32);
                break;

            
        }
    }
}
