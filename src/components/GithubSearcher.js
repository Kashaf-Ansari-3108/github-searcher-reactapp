import {useState,useEffect} from 'react'
import axios from 'axios'
import cartoon from '../assests/cartoon.png'
import text from '../assests/text.png'

const GithubSearcher = () => {
  const [inputValue, setInputValue] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [error, setError] = useState(false);
  const [callApi, setCallApi] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.github.com/users/${inputValue ? inputValue : "kashaf-ansari-3108"}`
      )
      .then((res) => {
        setUserInfo(res.data);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [callApi]);

  const handleForm = (e) => {
    e.preventDefault();
    console.log("inputValue", inputValue);

    if (!inputValue) {
      console.log("Please! Enter User");
      return;
    }

    setCallApi(!callApi);
    
  };
  console.log(userInfo);
   let {login,name,bio,followers,following,public_repos,avatar_url,html_url} = userInfo;
  
   return (
    <>
    
    <div className='inputContainer'>
     <h1>Search Github Profile</h1>
     <form  onSubmit={handleForm}>
    <input onChange={((e)=>setInputValue(e.target.value))} placeholder='Search....' type="text"/>
    </form>
    </div>
    {error == false ? (
      <div className="card">
    <div className="img">
      <img src={avatar_url} alt="" />
    </div>
    <div className="infos">
      <div className="name">
        <h2>{name}</h2>
        <h4>@{login}</h4>
      </div>
      <p className="text">{bio}</p>
      <ul className="stats">
        <li>
          <h3>{public_repos}</h3>
          <h4>Repos</h4>
        </li>
        <li>
          <h3>{following}</h3>
          <h4>Following</h4>
        </li>
        <li>
          <h3>{followers}</h3>
          <h4>Followers</h4>
        </li>
      </ul>
      <div className="links">
        
        <a target="_blank"href={html_url}><button className="follow">View Profile</button></a>
      </div>
    </div>
  </div>
    ): <div className='error'>
      <img className='cartoon' src={cartoon}/>
      <img className='errorText' src={text}/>
      </div>}
    
   
    </>
  )
}

export default GithubSearcher