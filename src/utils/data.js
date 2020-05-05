export const tickets = [
    {
    "id":3,
    "title": "Provident optio voluptatem reprehenderit.",
    "status": "Waiting for Approval",
    "created_at": "2020-02-05 13:47:20",
    "position": 1,
    "due_by": "2020-04-30 23:59:00",
    "assign_to": 256,
    "prioritize": 1,
    "client_data": {
        "id": 1,
        "client_timezone": "Europe\/London",
        "name": "Devon"
        },
    "designers":
        [
            {
                "id":1,
                "name":"Devon",
                "lastname":"Volkman",
                "image":"https://via.placeholder.com/150/92c952"
            },
            {
                "id":2,
                "name":"Alan",
                "lastname":"Volkman",
                "image":"https://via.placeholder.com/150/771796"
            },
            {
                "id":3,
                "name":"Timmy",
                "lastname":"Volkman",
                "image":"https://via.placeholder.com/150/54176f"
            },
        ]



    },
    {

    "id":4,
    "title": "ANother logo.",
    "status": "On queue",
    "created_at": "2020-02-05 13:47:20",
    "position": 1,
    "due_by": "2020-04-30 23:59:00",
    "assign_to": 253,
    "prioritize": 0,
    "client_data": {
        "id": 4,
        "client_timezone": "Europe\/London",
        "name": "Coca-cola"
        },
    "designers":
        [
            {
                "id":1,
                "name":"Devon",
                "lastname":"Volkman",
                "image":"https://via.placeholder.com/150/92c952"
            },
            {
                "id":3,
                "name":"Timmy",
                "lastname":"Volkman",
                "image":"https://via.placeholder.com/150/54176f"
            },
        ]
    },
]

export const callbacks = {
    "changestatus" : "http://thefutures.io/changestatus",
    "changeowner" : "http://thefutures.io/changestatus",
    "changepriority" : "http://thefutures.io/changepriority"
}
