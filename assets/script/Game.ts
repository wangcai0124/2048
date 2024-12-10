// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Tile from "./Tile";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    startPanel:cc.Node = null!;
    @property(cc.Node)
    gamePanel:cc.Node = null!;
    @property(cc.Node)
    overPanel:cc.Node = null!;

    @property(cc.Label)
    txtLv:cc.Label = null!;
    @property(cc.Label)
    txtScore:cc.Label = null!;
    @property(cc.Label)
    txtBestScore:cc.Label = null!;
    @property(cc.Label)
    txtBack:cc.Label = null!;
    @property(cc.Node)
    ndParent:cc.Node = null!;
    @property(cc.Prefab)
    item:cc.Prefab = null!;
    @property(cc.Prefab)
    itemBg:cc.Prefab = null!;


    private userData:any = null;
    private jiange:number = 0;
    private itemWH:number = 0;
    private itemParentWh:number = 0;
    private array = [];
    private array2 = [];

    private posStart;
    private posEnd;
    private gameType:number = 0;

    start() {
        this.initPanel();
        this.startPanel.active = true;
        this.addTouch();
    }

    private addTouch() {
        this.node.on(cc.Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.onTouchCancel,this);
    }

    private onTouchStart(event) {
        if (this.gameType!=1) return;
        this.posStart = event.getLocation();

    }
    private onTouchMove(event) {
        if (this.gameType!=1) return;
    }
    private onTouchEnd(event) {
        if (this.gameType!=1) return;
        this.posEnd = event.getLocation();
        let xx = this.posEnd.x - this.posStart.x;
        let yy = this.posEnd.y - this.posStart.y;
        if (Math.abs(xx) <10 && Math.abs(yy) < 10) return;
        if (Math.abs(xx) > Math.abs(yy)) {
            if (xx > 0) {
                this.moveItem("you");
                console.log("右移动");
            } else {
                this.moveItem("zuo");
                console.log("左移动");
            }
        } else {
            if (yy > 0) {
                this.moveItem("shang");
                console.log("上移动");
            } else {
                this.moveItem("xia");
                console.log("下移动");
            }
        }
    }

    private moveItem(type) {
        let canMove:boolean = false;
        let isGetScore:boolean = false;
        switch (type) {
            case "you":
                for (let j = this.array.length-2; j>=0; j--) {
                    for (let i = 0; i<this.array.length; i++){
                        for (let k = 0; k < this.array.length;k++) {
                            if (j+1+k < this.array.length &&this.array[i][j+1+k]==0 && this.array[i][j+k]>0) {
                                this.array[i][j+1+k] = this.array[i][j+k];
                                this.array[i][j+k] = 0;
                                canMove = true;
                            } else if (j+1+k < this.array.length && this.array[i][j+1+k] == this.array[i][j+k] && this.array[i][j+k]>0) {
                                this.array[i][j+1+k] = this.array[i][j+1+k] * 2;
                                this.array[i][j+k] = 0;
                                canMove = true;
                                isGetScore = true;
                                this.updateScore(this.array[i][j+1+k]);
                            }
                        }
                    }
                }
                break;
            case "zuo":
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array2[i][j] = this.array[i][this.array.length-j-1];
                    }
                }
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array[i][j] = this.array2[i][j];
                    }
                }

                for (let j = this.array.length-2; j>=0; j--) {
                    for (let i = 0; i<this.array.length; i++){
                        for (let k = 0; k < this.array.length;k++) {
                            if (j+1+k < this.array.length &&this.array[i][j+1+k]==0 && this.array[i][j+k]>0) {
                                this.array[i][j+1+k] = this.array[i][j+k];
                                this.array[i][j+k] = 0;
                                canMove = true;
                            } else if (j+1+k < this.array.length && this.array[i][j+1+k] == this.array[i][j+k] && this.array[i][j+k]>0) {
                                this.array[i][j+1+k] = this.array[i][j+1+k] * 2;
                                this.array[i][j+k] = 0;
                                canMove = true;
                                isGetScore = true;
                                this.updateScore(this.array[i][j+1+k]);
                            }
                        }
                    }
                }

                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array2[i][j] = this.array[i][this.array.length-j-1];
                    }
                }
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array[i][j] = this.array2[i][j];
                    }
                }
                break;
            case "shang":
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array2[i][j] = this.array[j][this.array.length-i-1];
                    }
                }
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array[i][j] = this.array2[i][j];
                    }
                }

                for (let j = this.array.length-2; j>=0; j--) {
                    for (let i = 0; i<this.array.length; i++){
                        for (let k = 0; k < this.array.length;k++) {
                            if (j+1+k < this.array.length &&this.array[i][j+1+k]==0 && this.array[i][j+k]>0) {
                                this.array[i][j+1+k] = this.array[i][j+k];
                                this.array[i][j+k] = 0;
                                canMove = true;
                            } else if (j+1+k < this.array.length && this.array[i][j+1+k] == this.array[i][j+k] && this.array[i][j+k]>0) {
                                this.array[i][j+1+k] = this.array[i][j+1+k] * 2;
                                this.array[i][j+k] = 0;
                                canMove = true;
                                isGetScore = true;
                                this.updateScore(this.array[i][j+1+k]);
                            }
                        }
                    }
                }

                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array2[i][j] = this.array[this.array.length-j-1][i];
                    }
                }
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array[i][j] = this.array2[i][j];
                    }
                }
                break;
            case "xia":
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array2[i][j] = this.array[this.array.length-j-1][i];
                    }
                }
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array[i][j] = this.array2[i][j];
                    }
                }

                for (let j = this.array.length-2; j>=0; j--) {
                    for (let i = 0; i<this.array.length; i++){
                        for (let k = 0; k < this.array.length;k++) {
                            if (j+1+k < this.array.length &&this.array[i][j+1+k]==0 && this.array[i][j+k]>0) {
                                this.array[i][j+1+k] = this.array[i][j+k];
                                this.array[i][j+k] = 0;
                                canMove = true;
                            } else if (j+1+k < this.array.length && this.array[i][j+1+k] == this.array[i][j+k] && this.array[i][j+k]>0) {
                                this.array[i][j+1+k] = this.array[i][j+1+k] * 2;
                                this.array[i][j+k] = 0;
                                canMove = true;
                                isGetScore = true;
                                this.updateScore(this.array[i][j+1+k]);
                            }
                        }
                    }
                }

                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array2[i][j] = this.array[j][this.array.length-i-1];
                    }
                }
                for (let i = 0; i < this.array.length; i++) {
                    for (let j = 0; j < this.array.length; j++) {
                        this.array[i][j] = this.array2[i][j];
                    }
                }
                break;

            default:
                break;
        }



        if (canMove) {
            this.cleanAllItem();
            for (let i = 0; i < this.array.length; i++) {
                for (let j = 0; j <this.array[i].length; j++) {
                    if (this.array[i][j] > 0) {
                        let pos = cc.v2(i,j);
                        this.createItem(pos,this.array[i][j]);
                    }
                }
            }
            this.addRandomArray();
        }
    }

    private cleanAllItem() {
        let children = this.ndParent.children;
        for (let i = children.length-1; i>=0; i--) {
            let tile = children[i].getComponent(Tile);
            if (tile) {
                this.ndParent.removeChild(children[i]);
            }
        }
    }

    private updateScore(score) {
        this.userData.score += score;
        if (this.userData.score > this.userData.bestScore) {
            this.userData.bestScore = this.userData.score;
        }
        this.txtScore.string = this.userData.score.toString();
        this.txtBestScore.string = this.userData.bestScore + "";
        this.saveUserInfo();

    }
    private onTouchCancel(event) {
        if (this.gameType!=1) return;
    }
    update(deltaTime: number) {

    }

    private initPanel() {
        this.startPanel.active = false;
        this.gamePanel.active = false;
        this.overPanel.active = false;
    }

    //初始化

    private init() {
        this.getUserInfo();
        this.updateView();
    }

    //获取用户信息
    private getUserInfo() {
        this.userData = JSON.parse(cc.sys.localStorage.getItem("userData"));
        if (this.userData == null) {
            this.userData = {
                lv:5,
                score:0,
                bestScore:0,
                array:[],
                arr_history:[],
                backNum:3
            }
        }
    }

    private saveUserInfo() {
        cc.sys.localStorage.setItem("userData", JSON.stringify(this.userData));
    }

    private updateView() {
        this.gameType = 1;
        let lv = this.userData.lv;
        this.jiange = 5;
        this.itemWH = Math.round(600/lv);
        this.itemParentWh = this.itemWH * lv + this.jiange*(lv+1);
        this.ndParent.width = this.itemParentWh;
        this.ndParent.height = this.itemParentWh;
        this.addItemBg(lv);

        this.txtLv.string = lv + "x" + lv;
        this.txtScore.string = this.userData.score.toString();
        this.txtBestScore.string = this.userData.bestScore + "";
        this.txtBack.string = "撤回(" + this.userData.backNum+")";

        this.initArray(lv);
        this.addRandomArray();
    }

    //初始化数组
    private initArray(lv) {
        this.array = [];
        this.array2 = [];
        for (let i = 0; i <lv; i++) {
            this.array[i] = [];
            this.array2[i] = [];
        }

        for (let i = 0; i < lv; i++) {
            for (let j = 0; j <lv; j++) {
                this.array[i][j] = 0;
                this.array2[i][j] = 0;
            }
        }
    }

    //在空格子上随机添加数字

    private addRandomArray()
    {
        let arr_0 = [];
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j <this.array[i].length; j++) {
                if (this.array[i][j] == 0) {
                    arr_0.push(cc.v2(i,j));
                }
            }
        }
        if (arr_0.length!=0) {
            let i_random= Math.floor(Math.random()*arr_0.length);
            let ii = arr_0[i_random].x;
            let jj = arr_0[i_random].y;
            let randomNum = Math.random()*10;
            if (randomNum<2) {
                this.array[ii][jj] = 4;
            } else {
                this.array[ii][jj] = 2;
            }
            this.createItem(arr_0[i_random], this.array[ii][jj],true)
            this.onCheckOver();
        }
    }

    private createItem(pos,num,isAction=false){
        let posStart = cc.v2(-this.itemParentWh/2 + this.itemWH/2 + this.jiange, -this.itemParentWh/2 + this.itemWH/2 + this.jiange);
        let item = cc.instantiate(this.item);
        let tile = item.getComponent(Tile);
        if (tile) {
            tile.init(num);
        }
        item.parent = this.ndParent;
        item.width = this.itemWH;
        item.height = this.itemWH;
        let posX = posStart.x + (this.itemWH + this.jiange) * pos.y;
        let posY = posStart.y + (this.itemWH + this.jiange) * pos.x;
        item.position = cc.v2(posX,posY);
        if (isAction) {
            item.scale = 0;
            cc.tween(item).to(0.15, {scale:1},{easing:"sineInOut"}).start();
        }
    }

    private addItemBg(lv:number) {
        let posStart = cc.v2(-this.itemParentWh/2 + this.itemWH/2 + this.jiange, -this.itemParentWh/2 + this.itemWH/2 + this.jiange);
        for (let i = 0; i < lv; i++) {
            for (let j = 0; j < lv; j++) {
                let itemBg = cc.instantiate(this.itemBg);
                itemBg.parent = this.ndParent;
                itemBg.width = this.itemWH;
                itemBg.height = this.itemWH;
                let posX = posStart.x + (this.itemWH + this.jiange) * j;
                let posY = posStart.y + (this.itemWH + this.jiange) * i;
                itemBg.position = cc.v2(posX,posY);
            }
        }
    }

    //点击事件
    private onBtnStartClick() {
        this.initPanel();
        this.gamePanel.active = true;
        this.init();
    }
    private onBtnReplayClick() {

    }
    private onBtnBackClick() {
    }
    private onBtnHomeClick() {
        this.initPanel();
        this.gameType = 0;
        this.startPanel.active = true;
    }
    private onOverBtnReplayClick() {
        this.overPanel.active = false;
    }
    private onOverBtnHomeClick() {
        this.initPanel();
        this.gameType = 0;
        this.startPanel.active = true;
    }

    private onCheckOver() {
        let isOver = true;
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array.length; j++) {
                if (this.array[i][j] == 0) {
                    isOver = false;
                }
                if (j+1 < this.array.length && this.array[i][j] == this.array[i][j+1]) {
                    isOver = false;
                }
                if (i+1 < this.array.length && this.array[i][j] == this.array[i+1][j]) {
                    isOver = false;
                }
            }
        }
        if (isOver) {
            this.gameType = 2;
            this.overPanel.active = true;
            let gameOverScore = this.userData.score;
            this.userData.score = 0;
            this.userData.array = [];
            this.userData.arr_history = [];
            this.userData.backNum = 3;
            this.saveUserInfo();
        } else {
            this.userData.arr_history.push(this.array);
            this.userData.array = this.array;
            let len = this.userData.arr_history.length-1;
            if (len > 10) {
                this.userData.arr_history.shift();
            }
            if (len > this.userData.backNum) {
                len = this.userData.backNum;
            }
            this.txtBack.string = "撤回(" + len + ")";
            this.saveUserInfo();
        }

    }

}
