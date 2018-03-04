let token = null

const blogs = [
  {
    "_id": {
        "$oid": "5a9c15c228b84f12240a3fdf"
    },
    "title": "new blog",
    "author": "author",
    "url": "url",
    "likes": 1,
    "user": {
        "$oid": "5a8c613d309d8e285c018c0b"
    },
    "__v": 0
},
  
{
    "_id": {
        "$oid": "5a9c161228b84f12240a3fe0"
    },
    "title": "asfsf",
    "author": "dsafd",
    "url": "hdfg",
    "likes": 0,
    "user": {
        "$oid": "5a8c613d309d8e285c018c0b"
    },
    "__v": 0
}
 
,
 {
    "_id": {
        "$oid": "5a9c27fa28b84f12240a3fe3"
    },
    "title": "aaaa",
    "author": "bbbb",
    "url": "ccc",
    "likes": 0,
    "user": {
        "$oid": "5a8c613d309d8e285c018c0b"
    },
    "__v": 0
}
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }