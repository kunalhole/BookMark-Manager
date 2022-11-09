import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { db } from "../firebase"
const BookMark = () => {
  const [newtitle, setNewTitle] = useState("")
  const [newurl, setNewUrl] = useState("")

  const [lists, setLists] = useState([])

  const [search, setSearch] = useState("")
  const [tags] = useState([""])

  const colRef = collection(db, "bookmarks")

  useEffect(() => {
    const getLists = async () => {
      // const data = await getDocs(colRef)
      // setLists(
      //   data.docs.map((doc) => ({
      //     ...doc.data(),
      //     id: doc.id,
      //   }))
      // )
      const q = query(colRef)
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let bookmark = []
        querySnapshot.forEach((doc) => {
          bookmark.push({ ...doc.data(), id: doc.id })
        })
        setLists(bookmark)
      })
      return unsubscribe
    }
    getLists()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault()
    if (newtitle && newurl) {
      await addDoc(colRef, { title: newtitle, url: newurl })
      setNewTitle("")
      setNewUrl("")
    }
  }

  const handleEdit = async (id, title, url) => {
    const userDoc = doc(db, "bookmarks", id)
    setNewTitle(title)
    setNewUrl(url)
    await deleteDoc(userDoc, id)
  }

  const handleDelete = async (id) => {
    const userDoc = doc(db, "bookmarks", id)
    await deleteDoc(userDoc, id)
  }
  return (
    <div className="w-full h-screen flex flex-col items-center p-5 space-y-10">
      <h1 className="font-bold text-[32px] text-center">
        BookMark Manager App
      </h1>
      <div className="w-[50%] bg-yellow-200 p-10 rounded-md shadow-md">
        <form className="flex flex-col">
          <label className="font-semibold" for="title">
            Title
          </label>
          <input
            className=" p-2 mt-3 focus:outline-none rounded-md "
            type="text"
            id="title"
            placeholder="Enter a title"
            required
            value={newtitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <label className="font-semibold mt-3" for="url">
            URL
          </label>
          <input
            className="w-full p-2 mt-3 focus:outline-none rounded-md"
            type="text"
            id="url"
            placeholder="Enter a url"
            required
            value={newurl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button
            onClick={(e) => handleClick(e)}
            className="mt-5 bg-blue-500 w-max block mx-auto p-3 rounded-md text-white font-semibold"
          >
            BookMark
          </button>
        </form>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="p-3 rounded-md focus:outline-none w-[40%] bg-gray-200 shadow-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col w-full space-y-5 max-w-2xl rounded-md">
        {lists
          .filter((list) => {
            return search.toLocaleLowerCase() === ""
              ? list
              : list.title.toLocaleLowerCase().includes(search)
          })
          .map((list) => {
            return (
              <div
                key={list.id}
                className="w-full p-5 bg-gray-300 space-y-5 flex flex-col rounded-md"
              >
                <h1 className="font-semibold text-[20px]">{list.title}</h1>
                <div className="flex flex-col space-y-2">
                  <p>Tags</p>

                  <a href={list.url} target="_blank">
                    {list.url}
                  </a>
                </div>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => handleEdit(list.id, list.title, list.url)}
                    className="p-4 bg-blue-500 rounded-md text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(list.id)
                    }}
                    className="p-4 bg-blue-500 rounded-md text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default BookMark
