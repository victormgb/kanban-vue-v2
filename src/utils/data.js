export const tickets = [
    {
    "id":32,
    "title": "Provident optio voluptatem reprehenderit.",
    "status": "Waiting for Approval",
    "created_at": "2020-02-05 13:47:20",
    "position": 1,
    "due_by": "2020-04-30 23:59:00",
    "avatar": "https://via.placeholder.com/150/92c952",
    "assign_to": 256,
    "designer_name":"Juan",
    "prioritize": 1,
    "client_data": {
        "id": 1,
        "client_timezone": "Europe\/London",
        "name": "Devon"
        },
    },
    {

    "id":460,
    "title": "ANother logo.",
    "status": "On queue",
    "created_at": "2020-02-05 13:47:20",
    "position": 1,
    "due_by": "2020-04-30 23:59:00",
    "assign_to": 253,
    "avatar": "https://via.placeholder.com/150/54176f",
    "designer_name":"Alberto",
    "prioritize": 0,
    "client_data": {
        "id": 4,
        "client_timezone": "Europe\/London",
        "name": "Coca-cola"
        },
    },
]

export const callbacks = {
    "changestatus" : "http://thefutures.io/changestatus",
    "changeowner" : "http://thefutures.io/changestatus",
    "changepriority" : "http://thefutures.io/changepriority"
}
