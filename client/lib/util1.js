(function ($) {
    $.JM={};

    /**
     * Created by jm_hello on 2017/2/13.
     */
//JM
    var JM=$.JM,
        doc=document;


/**
 * Basic Events
*/
    //add event procedure
    JM.addHandler=function (element,type,handler,useCap) {//添加事件处理程序
        if(element.addEventListener)this.addHandler=function (element,type,handler,useCap) {
            // console.log(handler);
            element.addEventListener(type,handler,useCap);
        };
        else if(element.attachEvent)this.addHandler=function (element,type,handler) {
            element.attachEvent('on'+type,handler);//IE
        };
        else this.addHandler=function (element,type,handler) {
                element['on'+type]=handler;//DOM0
            };
        this.addHandler(element,type,handler,useCap);
    };

    //remove event procedure
    JM.removeHandler=function (element,type,handler,useCap) {//删除事件处理程序
        if(element.removeEventListener)this.removeHandler=function (element,type,handler,useCap) {
            element.removeEventListener(type,handler,useCap);//DOM2
        };

        else if(element.detachEvent)this.removeHandler=function (element,type,handler) {
            element.detachEvent('on'+type,handler);//IE
        };
        else this.removeHandler=function (element,type) {
                element['on'+type]=null;//DOM0
            };
        this.removeHandler(element,type,handler,useCap);
    };
    //get event object
    JM.getEvent=function (event) {
        if(event)
            this.getEvent=function (event) {
                return event;
            };
        else
            this.getEvent=function (event) {
                return window.event;
            };
        return this.getEvent(event);
    };

    //get the actual event target
    JM.getTarget=function (event) {
        if(event.target)
            this.getTarget=function (event) {
                return event.target
            };
        else
            this.getTarget=function (event) {
                return event.srcElement
            };
        return this.getTarget(event);
    };

    //stop default behavior
    JM.preventDefault=function (event) {
        if(event.preventDefault)
            this.preventDefault=function (event) {
                event.preventDefault();
            };
        else
            this.preventDefault=function (event) {
                event.returnValue=false;
            };
        this.preventDefault(event);
    };

    //stop bubbling
    JM.stopPropagation=function (event) {//取消事件进一步捕获或冒泡
        if(event.stopPropagation)
            this.stopPropagation=function (event) {
                event.stopPropagation();
            };
        else
            this.stopPropagation=function (event) {
                event.cancelBubble=true;
            };
        this.stopPropagation(event);
    };

    //get data from the clipboard
    JM.getClipboardText=function (event) {
        if(event.clipboardData) this.getClipboardText=function (event) {
            return event.clipboardData.getData('text');
        };
        else this.getClipboardText=function () {
            return window.clipboardData.getData('text');//ie
        };
        return this.getClipboardText(event);
    };

    //set data to the clipboard
    JM.setClipboardText=function (event,value) {
        if(event.clipboardData) this.setClipboardText=function (event) {
            return event.clipboardData.setData("text/plain",value);
        };
        else this.setClipboardText=function (value) {
            return window.clipboardData.setData('text',value);//ie
        };
        return this.setClipboardText(event,value);
    };

    //get the position of curson in the inputs
    JM.getCursorPosition=function (ctrl) {//获取光标位置函数
        var CaretPos = 0;
        if (document.selection) // IE Support
            this.getCursorPosition=function (ctrl) {
                ctrl.focus();
                var Sel = document.selection.createRange();
                Sel.moveStart('character', -ctrl.value.length);
                CaretPos = Sel.text.length;
                console.log(-ctrl.value.length);
                return CaretPos;
            };
        else if (ctrl.selectionStart || ctrl.selectionStart == '0')
            this.getCursorPosition=function (ctrl) {
                CaretPos = ctrl.selectionStart;
                // console.log(ctrl.selectionEnd);
                return CaretPos;
            };

        return this.getCursorPosition(ctrl);
    };

    // selectText
    JM.selectText=function (textbox,startIndex,endIndex) {
        if(textbox.setSelectionRange) this.selectText=function (textbox,startIndex,endIndex) {
            textbox.setSelectionRange(startIndex,endIndex);
            textbox.focus();
        };
        else if(textbox.createTextRange) this.selectText=function (textbox,startIndex,endIndex) {
            var range=textbox.createTextRange();//create the range
            range.collapse(true);//fold the range to the start position
            range.moveStart('character',startIndex);
            range.moveEnd('character',endIndex-startIndex);
            range.select();
            textbox.focus();
        };
        this.selectText(textbox,startIndex,endIndex);
    };

    //getSelectedText
    JM.getSelectedText=function (textbox) {
        if(typeof textbox.selectionStart == 'number') this.getSelectedText=function (textbox) {
            return textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);
        };
        else if(document.selection) this.getSelectedText=function () {
            return document.selection.createRange().text;
        };
        return this.getSelectedText(textbox);
    };

    //throttle
    JM.throttle=function (fn,interval) {
        var _self=fn,//save the quote of function which is delayed
            timer,//a timer
            firstTime=true;//whether use it for the first time
        return function () {
            var args=arguments,//save the variable arguments
                _me=this;
            //if the function is carried out for the first time, don't need to delay implement
            if(firstTime){
                _self.apply(_me,args);
                return firstTime=false;
            }
            // if timer still exists,that is to say, the last delayed implement didn't implement
            if(timer) return false;
            timer=setTimeout(function () {//delay to carry out
                clearTimeout(timer);
                timer=null;
                _self.apply(_me,args);
            },interval||500);
        };
    };

    //timeChunk
    JM.timeChunk=function (ary,fn,count,interval) {
        var obj,
            t;
        var len=ary.length;
        var start=function () {
            for(var i=0;i<Math.min(count||1,ary.length);i++){
                var obj=ary.shift();
                fn(obj);
            }
        };
        return function () {
            t=setInterval(function () {
                if(ary.length===0)//if all nodes have been created
                    return clearInterval(t);
                start();
            },interval||200);
        };
    };

    //getValueLength
    JM.getValueLength=function (ele) {
        var html=ele.innerHTML;
        if(typeof html == 'string') return html.length;
    };

/**
 * Keyboard Events
 */
    //getCharCode
    JM.getCharCode=function (event) {
        if(event.charCode)
            this.getCharCode=function (event) {
                // console.log(event.charCode);
                return event.charCode; //ie9+ ff chrome safari
            };
        else
            this.getCharCode=function (event) {
                // console.log(event.keyCode);
                return event.keyCode;//ie<=8 opera
            };
        return this.getCharCode(event);
    };
    //getIdentifier
    JM.getIdentifier=function (event) {
        if( event.key)
            this.getIdentifier=function (event) {
                return event.key; //ie9
            };
        else
            this.getIdentifier=function (event) {
                return event.keyIdentifier;//chrome safari5
            };
        return this.getIdentifier(event);
    };
    //getLocation
    JM.getLocation=function (event) {
        if( event.location)
            this.getLocation=function (event) {
                return event.location; //ie9
            };
        else
            this.getLocation=function (event) {
                return event.keyLocation;//chrome safari5
            };
        return this.getLocation(event);
    };

/**
 *ajax
 * @param {Object} obj
 * @example
 *  {
     url:""
     method:"POST/GET"
     boolean:true/false [default true]
     data: json--->string
     fn:function(res){}
     }
 */
    JM.ajax=function (obj) {
        var xhr=JM.createXHR();
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4){
                if(xhr.status>=200 && xhr.status<300 || xhr.status==304){
                    var jsonData=xhr.getResponseHeader('Content-Type');
                    if(/json/.test(jsonData)) obj.fn(JSON.parse(xhr.responseText));
                    else obj.fn(xhr.responseText);
                }else throw new Error('Request was unsuccessful:'+xhr.status);
            }
        };
        xhr.open(obj.method,obj.url,obj.boolean||true);
        if(obj.requestHeader){
            for(var key in obj.requestHeader){
                xhr.setRequestHeader(key,obj.requestHeader[key]);
            }
        }
        xhr.send(JSON.stringify(obj.data)||null);
    };
    //createXHR
    JM.createXHR =function(){
        //ie>=7,Firefox,Opera,Chrome,Safari support original XHR object
        if (typeof XMLHttpRequest != "undefined"){
            return new XMLHttpRequest();
        }
        //ie<7
        else if (typeof ActiveXObject != "undefined"){
            if (typeof arguments.callee.activeXString != "string"){
                var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i, len;
                for (i=0,len=versions.length; i < len; i++){
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex){
                        console.error(ex);
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
        //can't find original objext XHR and ActiveObject,will throw err
        else {
            throw new Error("No XHR object available.");
        }
    };


/**
 *Get Elements
 */
    //getId
    JM.getId=function (id) {
        return document.getElementById(id);
    };
    //getEle
    JM.getEle=function (cssText) {
        return document.querySelector(cssText);
    };
    //getEles
    JM.getEles=function (cssText) {
        return document.querySelectorAll(cssText);
    };

/**
 *Sort Method
 */
    JM.swap=function (arr,index1,index2) {
        arr[index1]=[arr[index2],arr[index2]=arr[index1]][0];
    };
    //bubble sort
    JM.bubbleSort=function (arr) {
        var i=arr.length-1,pos,j;
        while(i){
            pos=0;
            for(j=0;j<i;j++){
                if(arr[j].localeCompare(arr[j+1]>0)){
                    pos=j;
                    this.swap(arr,j,j+1);
                }
            }
            i=pos;
        }
        return arr;
    };
    //upBubbleSort
    JM.upBubbleSort=function (arr) {
        var len=arr.length,
            low=0,
            high=len-1,
            temp,j;
        while(low<high){
            for(j=low;j<high;++j)
                if(arr[j]>arr[j+1]){
                    temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
            --high;
            for(j=high;j>low;--j)
                if(arr[j]<arr[j-1]){
                    temp=arr[j];
                    arr[j]=arr[j-1];
                    arr[j-1]=temp;
                }
            ++low;
        }
        return arr;
    };

    //selection sort
    JM.selectionSort=function (arr) {
        var len=arr.length,
            indexMin;
        for(var i=0;i<len-1;i++){
            indexMin=i;
            for(var j=i+1;j<len;j++){
                if(arr[j]<arr[indexMin]) indexMin=j;
            }
            JM.swap(arr,i,indexMin);
        }
        return arr;
    };

    //insertionSort
    JM.insertionSort=function (arr)  {
        var ele=arr,
            len=ele.length,
            outer=1,
            inner,
            temp;
        for(;outer<=len-1;++outer){
            temp=ele[outer];
            inner=outer;
            while(inner>0 && (ele[inner-1] >=temp)){
                ele[inner]=ele[inner-1];
                --inner;
            }
            ele[inner]=temp;
        }
        return ele;
    };
    //binaryInsertionSort
    JM.binaryInsertionSort=function (array) {
        var arr=array;
        if(Object.prototype.toString.call(arr).slice(8,-1)==='Array'){
            for(var i=1,len=arr.length;i<len;i++){
                var key=arr[i],
                    left=0,
                    right=i-1;
                while(left<=right){
                    var middle=parseInt((left+right)>>1);
                    if(key<arr[middle]) right=middle-1;
                    else left=middle+1;
                }
                for(var j=i-1;j>=left;j--) arr[j+1]=arr[j];
                arr[left]=key;
            }
            return arr;
        }else return 'array is not an Array!';
    };

    //mergeSort
    JM.mergeSort=function (array) {
        return mergeSortRect(array);
    };
    function mergeSortRect(array) {
        var arr=array,
            len=arr.length;
        if(len===1) return array;
        var mid=Math.floor(len>>1),
            left=arr.slice(0,mid),
            right=arr.slice(mid);
        return merge(mergeSortRect(left),mergeSortRect(right));
    }
    function merge(left,right) {
        var result=[],
            il=0,
            ir=0,
            l_len=left.length,
            r_len=right.length;
        while(il<l_len&&ir<r_len){
            if(left[il]<right[ir]) result.push(left[il++]);
            else result.push(right[ir++]);
        }
        while(il<l_len) result.push(left[il++]);
        while(ir<r_len) result.push(right[ir++]);
        return result;
    }
/**
 * Search Methods
*/
    //sequence search
    JM.seqSearch=function (arr,data) {
        var i=0,
            len=arr.length;
        for(;i<len;i++){
            if(arr[i]==data) return i;
        }
        return -1;
    };
    //find min num
    JM.findMin=function (arr) {
        var min=arr[0],
            len=arr.length;
        for(var i=1;i<len;i++){
            if(arr[i]<min) min=arr[i];
        }
        return min;
    };
    //find max num
    JM.findMax=function (arr) {
        var max=arr[0],
            len=arr.length;
        for(var i=1;i<len;i++){
            if(arr[i]>max) max=arr[i];
        }
        return max;
    };

/**
 * Dom Operations
 */
    //create elements
    JM.createEle=function (ele,fn) {
        var el=document.createElement(ele);
        if(fn) fn(el);
        return el;
    };
    //getFirstChild
    JM.getFirstChild=function (nodes) {
        if(nodes.firstElementChild) this.getFirstChild=function (nodes) {
            return nodes.firstElementChild;
        };
        else this.getFirstChild=function (nodes) {
            return nodes.firstChild;
        };
        return this.getFirstChild(nodes);
    };
    //getLastChild
    JM.getLastChild=function (nodes) {
        if(nodes.lastElementChild) this.getLastChild=function (nodes) {
            return nodes.lastElementChild;
        };
        else this.getLastChild=function (nodes) {
            return nodes.lastChild;
        };
        return this.getLastChild(nodes);
    };
    //getChildren
    JM.getChildren=function (nodes) {
        if(nodes.children) this.getChildren=function (nodes) {
            return nodes.children;
        };
        else this.getChildren=function (nodes) {
            return nodes.childNodes;
        };
        return this.getChildren(nodes);
    };
    //getNextChild
    JM.getNextChild=function (nodes) {
        if(nodes.nextElementSibling) this.getNextChild=function (nodes) {
            return nodes.nextElementSibling;
        };
        else this.getNextChild=function (nodes) {
            return nodes.nextSibling;
        };
        return this.getNextChild(nodes);
    };
    //addNodes
    JM.addNodes=function (parentNode,newNode) {
        var nodes=JM.getChildren(parentNode),
            i=nodes.length;
        if(i>0){
            parentNode.insertBefore(newNode,nodes[i]);
        }else{
            parentNode.appendChild(newNode);
        }
    };
    //removeNodes
    JM.removeNodes=function (parentNode,node) {
        parentNode.removeChild(node);
    };
    //getPreChild
    JM.getPreChild=function (nodes) {
        if(nodes.previousElementSibling) this.getPreChild=function (nodes) {
            return nodes.previousElementSibling;
        };
        else this.getPreChild=function (nodes) {
            return nodes.previousSibling;
        };
        return this.getPreChild(nodes);
    };


    //getSingle
    var getSingle=function (fn) {
        var result;
        return function () {
            return result || (result=fn.apply(this,arguments));
        }
    };

    //convert Nodes to Arra
    JM.convertToArray=function (nodes) {
        var array=null;
        try{
            array.prototype.slice.call(nodes,0);// except IE
            console.log(array);
        }catch (ex){
            //IE
            array=new Array();
            for(var i=0,len=nodes.length;i<len;i++){
                array.push(nodes[i]);
            }
        }
        return array;
    };
/*
* isType
* @example
* "[object Null]"
 "[object Undefined]"
 "[object String]"
 "[object Number]"
 "[object Boolean]"
 "[object Function]"
 "[object Date]"
 "[object Array]"---RegExp or Array
 "[object Object]"
* */
    JM.isType=function (obj,type) {
        return new RegExp(type.toLowerCase(),'i').test(Object.prototype.toString.call(obj));
    };

/*
* Iterator Methods
* */
    //inArray
    JM.inArray=function (elem,arr,i) {
        var len,
            a=arr.reverse();
        if(arr){
            // if(arr.indexOf) return arr.indexOf.call(arr,elem,i);
            len=a.length;
            i=i ? (i<0 ? Math.max(0,len+i):i):0;
            for(;i<len;i++) if(a[i]==elem) return i;
        }
        return -1;
    };
    //inner iterator
    JM.inIterator=function (ary,callback) {
        for(var i=0,len=ary.length;i<len;i++) callback(i,ary[i],len);
    };
    //outer iterator
    JM.outIterator=function (obj) {
        var current=0,
            len=obj.length;
        var next=function () {
            current+=1;
        };
        var isDone=function () {
            return current>=len;
        };
        var getCurrentItem=function () {
            return obj[current];
        };
        return{
            'next':next,
            'isDone':isDone,
            'getCurrentItem':getCurrentItem
        }
    };
    //iterator array or object
    JM.iterator=function (obj,callback) {
        var value,
            i=0,
            len=obj.length,
            isArray=JM.isType('Array');
        if(isArray(obj)) this.iterator=function (obj,callback) {
            for(;i<len;i++){
                value=callback.call(obj[i],i,obj[i]);
                if(value===false) break;
            }
            return obj;
        };
        else this.iterator=function (obj,callback) {
            for(i in obj){
                value=callback.call(obj[i],i,obj[i]);
                if(value===false) break;
            }
            return obj;
        };
        return this.iterator(obj,callback);
    };
    //reverse iterator
    JM.reverseIterator=function (ary,callback) {
        var i=ary.length-1,
            len=ary.length;
        for(;i>=0;i--){
            callback(i,ary[i],len);
        }
    };
/*
* Data Structure
* */
    //List
    JM.List=function() {
        this.listSize=0;//列表的元素个数
        this.pos=0;
        this.dataStore=[];
    };
    JM.List.prototype={
        'constructor':JM.List,
        append:function (element) {
            this.dataStore[this.listSize++]=element;
        },
        find:function (element) {
            var i=0,
                len=this.dataStore.length;
            for(;i<len;i++){
                if(this.dataStore[i]==element) return i;
            }
            return -1;
        },
        remove:function (element) {
            var foundAt=this.find(element);
            if(foundAt>-1){
                this.dataStore.splice(foundAt,1);
                --this.listSize;
                return true;
            }
            return false;
        },
        length:function () {
            return this.listSize;
        },
        toString:function () {
            return this.dataStore;
        },
        insert:function (element,after) {
            var insertPos=this.find(after);
            if(insertPos>-1){
                this.dataStore.splice(insertPos+1,0,element);
                ++this.listSize;
                return true;
            }
            return false;
        },
        clear:function () {
            delete this.dataStore;
            this.dataStore=[];
            this.listSize=this.pos=0;
        },
        contains:function (element) {
            var i=0,
                len=this.dataStore.length;
            for(;i<len;i++){
                if(this.dataStore[i]==element) return true;
            }
            return false;
        },
        front:function () {
            this.pos=0;
        },
        end:function () {
            this.pos=this.listSizes-1;
        },
        prev:function () {
            if(this.pos>0) --this.pos;
        },
        next:function () {
            if(this.pos<this.listSize-1) ++this.pos;
        },
        currPos:function () {
            return this.pos;
        },
        moveTo:function (position) {
            this.pos=position;
        },
        getElement:function () {
            return this.dataStore[this.pos];
        }
    };

    //Queue
    JM.Queue=function () {
        this.items=[];
    };
    JM.Queue.prototype={
        constructor:JM.Queue,
        enqueue:function (element) {
            this.items.push(element);
        },
        dequeue:function () {
            this.items.shift();
        },
        front:function () {
            return items[0];
        },
        isEmpty:function () {
            return items.length==0;
        },
        clear:function () {
            this.items=[];
        },
        size:function () {
            return items.length;
        },
        print:function(){
            console.log(items.toString());
        }
    };

    //SingleList
    JM.SingleList=function () {
        this.Node=function (element) {
            this.element=element;
            this.next=null;
        };
        this.length=0;
        this.head=null;
    };
    JM.SingleList.prototype={
        constructor:JM.SingleList,
        append:function (element) {
            var node=new this.Node(element),
                current;
            if(this.head==null){
                this.head=node;
            }else{
                current=this.head;
                while(current.next){
                    current=current.next;
                }
                current.next=node;
            }
            this.length++;
        },
        removeAt:function (position) {
            if(position>0 && position < this.length){
                var current=head,
                    previous,
                    index=0;
                if(position===0){
                    head=current[this.next];
                }else{
                    while (index++<position){
                        previous=current;
                        current=current.next;
                    }
                    previous.next=current.next;
                }
                this.length--;
                return current.element;
            }else{
                return null;
            }
        },
        insert:function (position,element) {
            if(position>=0 && position <=this.length){
                var node=new JM.BSTNode(element),
                    current=this.head,
                    previous,
                    index=0;
                if(position==0){
                    node.next=current;
                    head=node;
                }else{
                    while(index++<position){
                        previous=current;
                        current=current.next;
                    }
                    node.next=current;
                    previous.next=node;
                }
                this.length++;
                return true;
            }else{
                return false;
            }
        },
        indexOf:function (element) {
            var current=this.head,
                index=-1;
            while(current){
                if(element==current.element){
                    return index;
                }
                index++;
                current=current.next;
            }
            return -1;
        },
        isEmpty:function () {
            return this.length==0;
        },
        size:function () {
            return this.length;
        },
        getHead:function () {
            return this.head;
        }
    };

    //BST
    //inheritPrototype
    JM.inheritPrototype=function (subType,superType) {
        var prototype=new Object(superType.prototype);
        prototype.constructor=subType;
        subType.prototype=prototype;
    };
    var showBSTData_$=function() {
        return this.data;
    };
    JM.BSTNode=function (data,left,right) {
        this.data=data;
        this.left=left;
        this.right=right;
        this.show=showBSTData_$;
    };
    JM.BST=function () {
        this.root=null;
    };
    JM.BST.prototype={
        constructor:JM.BST,
        insert:function (data,obj) {
            if(!obj)obj=JM.BSTNode;
            var node =new obj(data,null,null);
            if(this.root==null){
                this.root=node;
            }else{
                var current=this.root,
                    parent;
                while(true){
                    parent=current;
                    if(data<current.data){
                        current=current.left;
                        if(current==null){
                            parent.left=node;
                            break;
                        }
                    }else{
                        current=current.right;
                        if(current==null){
                            parent.right=node;
                            break;
                        }
                    }
                }
            }
        },
        search:function (data) {
            var current=this.root;
            while(current!=null){
                if(current.data==data) return current;
                else if(data<current.data) current=current.left;
                else current=current.right;
            }
            return null;
        },
        remove:function (node,data) {
            if(node==null) return null;
            if(data==node.data){
                if(node.left==null && node.right==null) return null;
                if(node.left==null) return node.right;
                if(node.right==null) return node.left;
                var tempNode=this.getMinNode(node.right);
                node.data=tempNode.data;
                node.right=this.remove(node.right,tempNode.data);
                return node;
            }else if(data<node.data){
                node.left=this.remove(node.left,data);
                return node;
            }else{
                node.right=this.remove(node.right,data);
                return node;
            }
        },
        inOrder:function (node,callback) {
            if(node!==null){
                this.inOrder(node.left,callback);
                callback(node.data);
                this.inOrder(node.right,callback);
            }
        },
        preOrder:function (node,callback) {
            if(node!==null){
                callback(node.data);
                this.preOrder(node.left,callback);
                this.preOrder(node.right,callback);
            }
        },
        postOrder:function (node,callback) {
            if(node!==null){
                this.postOrder(node.left,callback);
                this.postOrder(node.right,callback);
                callback(node.data);
            }
        },
        getMin:function () {
            var current=this.root;
            while(current.left!==null){
                current=current.left;
            }
            return current.data;
        },
        getMinNode:function () {
            var current=this.root;
            while(current.left!==null){
                current=current.left;
            }
            return current;
        },
        getMax:function () {
            var current=this.root;
            while(current.right!==null){
                current=current.right;
            }
            return current.data;
        },
        getMaxNode:function () {
            var current=this.root;
            while(current.right!==null){
                current=current.right;
            }
            return current;
        }
    };
    JM.BSTNode_ih=function (data,left,right) {
        JM.BSTNode.apply(this,arguments);
        this.count=1;
    };
    JM.BST_count=function () {
        JM.BST.call(this);
    };
    JM.inheritPrototype(JM.BST_count,JM.BST);
    JM.BST_count.prototype.update=function (data) {
        var grade=this.search(data);
        grade.count++;
        return grade;
    };

    //Dictionary
    JM.Dictionary=function (obj) {
        this.items=obj||{};
    };
    JM.Dictionary.prototype={
        'constructor':JM.Dictionary,
        'has':function (key) {
            return key in this.items;
        },
        'set':function (key,value) {
            this.items[key]=value;
        },
        'remove':function (key) {
            if(this.has(key)){
                delete this.items[key];
                return true;
            }
            return false;
        },
        'getOneItem':function (key) {
            return this.has(key)?this.items[key]:undefined;
        },
        'getAllValues':function () {
            var values=[];
            for(var key in this.items){
                if(this.has(key))
                    values.push(this.items[key]);
            }
            return values;
        },
        'getAllKeys':function () {
            var keys=[];
            for(var key in this.items){
                if(this.has(key))
                    keys.push(key);
            }
            return keys;
        },
        'getItems':function () {
            return this.items;
        },
        'clear':function () {
            this.items={};
        },
        'getSize':function () {
            var count=0;
            for(var key in this.items)
                if(this.items.hasOwnProperty(key))
                    ++count;
            return count;
        }
    };

    //hashTable
    JM.djb2HashCode=function (key) {
        var hash=5381;
        for(var i=0,len=key.length;i<len;i++)
            hash=hash*33+key.charCodeAt(i);
        return hash%1013;
    };
    JM.valuePair=function (key,value) {
        this.key=key;
        this.value=value;
    };
    JM.HashTable=function () {
        this.table=[];
        this.getHash=JM.djb2HashCode;
        this.valuePair=JM.valuePair;
    };
    JM.HashTable.prototype={
        'constructor':JM.HashTable,
        'set':function (key,value) {
            var position=this.getHash(key);
            if(this.table[position]===undefined) this.table[position]=new this.valuePair(key,value);
            else{
                var index=++position;
                while(this.table[index]!==undefined) index++;
                this.table[index]=new this.valuePair(key,value);
            }
        },
        'get':function (key) {
            var position=this.getHash(key);
            if(this.table[position]!==undefined) return this.table[position].value;
            else{
                var index=++index;
                while(this.table[index]===undefined || this.table[index].key!==key) index++;
                if(this.table[index].key===key) return this.table[index].value;
            }
            return undefined;
        },
        'remove':function (key) {
            var position=this.getHash(key);
            if(this.table[position]!==undefined) {
                this.table[position]=undefined;
                return true;
            }
            else{
                var index=++index;
                while(this.table[index]===undefined || this.table[index].key!==key) index++;
                if(this.table[index].key===key) {
                    this.table[index]=undefined;
                    return true;
                }
            }
            return false;
        },
        'getTable':function () {
            return this.table;
        }
    };

    JM.HTable_list=function () {
        this.table=[];
        this.getHash=JM.djb2HashCode;
        this.valuePair=JM.valuePair;
    };
    JM.HTable_list.prototype={
        'constructor':JM.HTable_list,
        'put':function (key,value) {
            var position=this.getHash(key);
            if(this.table[position]==undefined) this.table[position]=new JM.SingleList();
            this.table[position].append(new this.valuePair(key,value));
            console.log(this.table[position]);

        },
        'get':function (key) {
            var position=this.getHash(key);
            if(this.table[position]!==undefined){
                var current=table[position].getHead();
                while(current.next){
                    if(current.element.key===key){
                        return current.element.value;
                    }
                    current=current.next;
                }
                if(current.element.key===key) return current.element.value;
            }
            return undefined;
        },
        'remove':function (key) {
            var position=this.getHash(key);
            if(this.table[position]!==undefined){
                var current=this.table[position].getHead();
                while(current.next){
                    if(current.element.key===key){
                        this.table[position].remove(current.element);
                        if(this.table[position].isEmpty())
                            this.table[position]=undefined;
                        return true;
                    }
                    current=current.next;
                }
                if(current.element.key===key){
                    this.table[position].remove(current.element);
                    if(this.table[position].isEmpty()) this.table[position]=undefined;
                    return true;
                }
            }
            return false;
        },
        'getTable':function () {
            return this.table;
        }
    };

/**
 * Other Functions
 */
    //addClass
    JM.addClass=function (eleOrObj,classname) {
    if(!eleOrObj.nodeType) {
        for (var className in eleOrObj)
            if (!new RegExp('\\b' + className + '\\b', 'gi').test(eleOrObj[className].className))
                eleOrObj[className].className = eleOrObj[className].className.concat(' ' + className);
    } else if(!new RegExp('\\b'+classname+'\\b','gi').test(eleOrObj.className))
        eleOrObj.className=eleOrObj.className.concat(' '+classname);
};
    //removeClass
    JM.removeClass=function (eleOrObj,classname) {
        if(!eleOrObj.nodeType) {
            for (var className in eleOrObj)
                if(new RegExp('\\b'+className+'\\b','gi').test(eleOrObj[className].className))
                    eleOrObj[className].className=(''+eleOrObj[className].className+'').replace(className,'');
        } else if(new RegExp('\\b'+classname+'\\b','gi').test(eleOrObj.className))
            eleOrObj.className=(''+eleOrObj.className+'').replace(classname,'');
    };
    //getStyle
    JM.getStyle=function (element,attrName) {
        if(element.currentStyle) this.getStyle=function (element,attrName) {
            return element.currentStyle[attrName];
        };
        else this.getStyle=function (element,attrName) {
            return getComputedStyle(element,false)[attrName];
        };
        return this.getStyle(element,attrName);
    };
    //nameSpace
    JM.createNameSpace=function (obj,name) {
        var part=name.split('.'),
            current=obj;
        for(var i in obj){
            if(!current[part[i]]){
                current[part[i]]={};
            }
            current=current[part[i]];
        }
    };
    //createObjURL
    JM.createObjURL=function (blob) {
        if(window.URL) this.createObjURL=function (blob) {
            return window.URL.createObjectURL(blob);
        };
        else if(window.webkitURl) this.createObjURL=function (blob) {
            return window.webkitURl.createObjectURL(blob);
        };
        else this.createObjURL=function () {
                return null;
            };
        return this.createObjURL(blob);
    };
    //getLocalStorage
    JM.getLocalStorage=function () {
        if(typeof localStorage =='object') this.getLocalStorage=function () {
            return localStorage;
        };
        else if(typeof globalStorage == 'object') this.getLocalStorage=function () {
            return globalStorage[location.host];
        };
        else this.getLocalStorage=function () {
                return null;
            };
    };
    //toBase64
    JM.toBase64=function (info,img,width,height,fn) {
        var canvas=document.createElement('canvas');
        canvas.width=width;
        canvas.height=height;
        if(canvas.getContext){
            var ctx=canvas.getContext('2d');
            ctx.drawImage(img,0,0,canvas.width,canvas.height);
            var newImgData=canvas.toDataURL(info.file.type,0.8);
            if(fn)fn(newImgData);
        }
    };

    //readAFile
    JM.readAFile=function (fileInput,fn) {
        JM.addHandler(fileInput,'change',function (e) {
            var file=JM.getTarget(JM.getEvent(e)).files[0],
                reader=new FileReader(),
                type=file.type,
                extname=type.split('/')[1];
            reader.readAsDataURL(file);
            reader.onload=function (ev) {
                var result=JM.getTarget(JM.getEvent(ev)).result,
                    img=new Image();
                img.src=result;
                img.onload=function () {
                    var width=this.width,
                        height=this.height,
                        info={
                            'file':file,
                            'extname':extname,
                            'width':width,
                            'height':height
                        };
                    if(fn)fn.call(this,info);
                };
            }
        },false)
    };
    
    //get more files
    JM.getMoreFile=function (fileInput,fn) {
        JM.addHandler(fileInput,'change',function (e) {
            var files=JM.getTarget(JM.getEvent(e)).files,
                len=files.length,
                infos=[];
            (function interator(i) {
                if(i==len) {
                   fn && fn(infos);
                    return;
                }
                var item=files[i],
                    type=item.type,
                    extname=type.split('/')[1];
                reader=new FileReader();
                reader.readAsDataURL(item);
                reader.onload=function (e) {
                    var ev=JM.getEvent(e),
                        result=JM.getTarget(ev).result,
                        img=new Image();
                    img.src=result;
                    img.onload=function () {
                        infos.push({
                            'file':item,
                            'img':this,
                            'extname':extname,
                            'width':this.width,
                            'height':this.height
                        });
                        interator(++i);
                    };
                };
            })(0);
        },false)
    };
/*
* Realize AOP By Function.prototype
* */
    Function.prototype.before=function (beforeFn) {
        var _self=this;//save the quote of the original function
        return function () {// return the agency function including original and new functions
            beforeFn.apply(this,arguments); //excute the new function,amend this
            return _self.apply(this,arguments);//excute the original function
        }
    };

    Function.prototype.after=function (afterFn) {
        var _self=this;
        return function () {
            var ret=_self.apply(this,arguments);
            afterFn.apply(this,arguments);
            return ret;
        };
    };

    /******************************** Plug-in *****************************************************/
    JM.component={};
})(window);