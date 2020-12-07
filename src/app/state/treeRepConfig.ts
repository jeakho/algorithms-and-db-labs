export const TreeRepConfig = {
    onEmptyTreeMessage: "<<EMPTY TREE>>",

    node: {
        edge: {
            borderWidth: 2,
        },
        text: {
            fontSize: 25,
            verticalAlign: 'middle' as "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom", 
            horizontalAlign: 'center' as "left" | "right" | "center" | "start" | "end",
        },
        radius: 30
    },

    connection: {
        width: 1
    },

    foundNode: {
        radius: 30,
        color: '#ff0000',
        borderWidth: 2
    }
}