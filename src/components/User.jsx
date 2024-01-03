import React, { useEffect, useState } from 'react'

const User = () => {
    const [data, setData] = useState();
    const [searched, setSearched] = useState([]);
    const [item, setItem] = useState('');
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                const users = await items.json();
                setData(users);
            } catch (error) {
                console.log(`There is some error in fetching data ${error}`)
            }
        };
        fetchData();
        console.log(data);
    }, [])
    const handleSort = () => {
      const temp=[...data].sort((a,b)=>a.name.localeCompare(b.name))
        setData(temp);
    }
    useEffect(() => {
        const pastData = localStorage.getItem('searched');
        if (pastData) {
            setSearched(JSON.parse(pastData));
        }
    }, [])
    const updatePastData = (term) => {
        const currentSearch = [...searched, term];
        setSearched(currentSearch);
        localStorage.setItem('searched', JSON.stringify(currentSearch));
    }
    const handleClick = () => {
        if (item.trim() !== '') {
            updatePastData(item);
       }
   }

  return (
    <div className="mx-5 mt-10 ">
      <div className="w-full flex:col md:flex justify-between items-center mb-5">
        <button
          className="bg-slate-500 p-1 hover:bg-red-700 hover:text-white rounded-md"
          onClick={handleSort}
        >
          Sort By Name
        </button>
        <div className="flex flex-col items-center">
          <div className="">
            <input
              className="border p-1 mx-1"
              type="text"
              placeholder="Search User"
              onChange={(e) => setItem(e.target.value)}
            />
            <button
              className=" hover:bg-red-700 hover:text-white bg-slate-500 p-1 rounded-md"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
          <div>
           
                      <button className='text-blue-700 hover:underline' onClick={() => setFlag(!flag)}>{ !flag?'Recent Searches':'Close'}</button>
          
              <ul>
                {searched && flag
                  ? searched.map((past, key) => <li key={key}>{past}</li>)
                  : ""}
              </ul>
            
          </div>
        </div>
      </div>

      <table className="w-full border text-center">
        <thead>
          <tr className="border">
            <th className="border p-2">Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Company</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data
              .filter((user) =>
                user.name.toLowerCase().includes(item.toLowerCase())
              )
              .map((user) => (
                <tr className="border" key={user.id}>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.phone}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    {user.address.street} {user.address.suite}{" "}
                    {user.address.zipcode} {user.address.city}
                  </td>
                  <td className="border p-2">{user.company.name}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-2 text-center">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default User