/*
    HTMセル結合部品
    © 2021 Hiromichi Yoneda
*/

const setRowSpan = (rowArr, colIndexArr) => {
    const rowsCount = rowArr.length;
    if (rowsCount > 1) {
        // 配列の2番以降のtrの対象tdを削除する。
        for (let i = 0; i < colIndexArr.length; i++) {
            for (let j = 1; j < rowsCount; j++) {
                const dt = rowArr[j].children[colIndexArr[i]-i];
                console.info(dt);
                dt.parentNode.removeChild(dt);
            }
        }

        // 配列の最初のtrの対象tdのrowSpanに配列の個数をセット
        for (let i = 0; i < colIndexArr.length; i++) {
            const firstDt = rowArr[0].children[colIndexArr[i]];
            firstDt.rowSpan = rowsCount;
        }
    }      
}

/*
    trArr：対象のテーブルのtrの配列
    colIndexArr：結合したい列のIndex　例：[0,1,2]
*/
const convineColumn = (trArr, colIndexArr) => {
    // trの配列
    let workTrArr = [];
    // trの配列の個数
    let workTrArrCount = 0;
    // 比較値格納用
    let currentValueArr = [];
    let nextValueArr = [];

    trArr.forEach(function (elm) {
        for (let i = 0; i < colIndexArr.length; i++) {
            currentValueArr.push(elm.children[colIndexArr[i]].innerText);
        }
        //const currentValue = $(elm).children('td')[colIndexArr[0]].innerText;
        // trを配列に格納
        workTrArr.push(elm);
        const nextTr = elm.nextElementSibling;
        // 最終行の処理
        if (nextTr === null) {
            workTrArrCount = workTrArr.length;
            for (let i = 0; i < colIndexArr.length; i++) {
                    const firstDt = workTrArr[0].children[colIndexArr[i]];
                    firstDt.rowSpan = workTrArrCount;
            }
            if (workTrArrCount > 1) {
                setRowSpan(workTrArr, colIndexArr);
            }
            return;
        }
        
        for (let i = 0; i < colIndexArr.length; i++) {
            nextValueArr.push(elm.nextElementSibling.children[colIndexArr[i]].innerText);
        }

        // 現在の行と次の行の値が違う場合
        console.info(currentValueArr.join());    
        console.info(nextValueArr.join());
        if (currentValueArr.join() !== nextValueArr.join()) {
            workTrArrCount = workTrArr.length;
            if (workTrArrCount > 1) {
                setRowSpan(workTrArr, colIndexArr);
            }      
            // trの配列初期化
            workTrArr = [];
        } 
        currentValueArr = [];
        nextValueArr = [];
    })
}

export { convineColumn };
