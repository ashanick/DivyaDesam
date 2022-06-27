function TreeArray(){
    var nodes = [{ id: 6, pid: 1, name: "cace" }, 
                    { id: 1, pid: 0, name: "kpittu" }, 
                    { id: 2, pid: 0, name: "news" }, 
                    { id: 3, pid: 0, name: "menu" }, 
                    { id: 4, pid: 3, name: "node" }, 
                    { id: 5, pid: 4, name: "subnode" }],
    tree = function (data, root) {
        var r = [], o = {};
        data.forEach(function (a) {
            if (o[a.id] && o[a.id].children) {
                a.children = o[a.id] && o[a.id].children;
            }
            o[a.id] = a;
            if (a.pid === root) {
                r.push(a);
            } else {
                o[a.pid] = o[a.pid] || {};
                o[a.pid].children = o[a.pid].children || [];
                o[a.pid].children.push(a);
            }
        });
        return r;
    }(nodes, 0);

    console.log(tree);
        return(
            <div>
                In tree array
            </div>
        )
}

export default TreeArray