import React, { Component, useEffect, useState } from "react";
import "../assets/infouser.css";
import UserService from "../services/user.service";
import BattleService from "../services/battle.service";
import accountService from "../services/account.service";
import { Spinner } from "react-bootstrap";
function UserInfo(props) {
  const [info, setInfo] = useState(null);
  const [modifyInfo, setModifyInfo] = useState(null);
  const [five, setFive] = useState(null);
  const [img, setImg] = useState("https://i.stack.imgur.com/QBuke.gif");
  const [updating, setUpdating] = useState(false);
  const user = accountService.getCurrentUserInfo();
  const genders = ["Male", "Female", "Other"];
  useEffect(async () => {
    const usrs = await UserService.getUserBy(user.ID);
    const fives = await BattleService.getRecentBattles(user.ID);
    //console.log(fives);
    const res = await usrs.json();
    const res1 = await fives.json();
    console.log(res1);
    if (res) {
      //console.log(res1);
      //console.log(five);
      setInfo(res);
      setModifyInfo(res);
      setFive(res1);
      setImg(
        Boolean(res.Avatar) ? res.Avatar : "https://i.stack.imgur.com/QBuke.gif"
      );

    }
  }, []);

  const changeNameHandler = (e) => {
    const u = { ...modifyInfo };
    u.Name = e.target.value;
    setModifyInfo(u);
  }

  const changeEmailHandler = (e) => {
    const u = { ...modifyInfo };
    u.Email = e.target.value;
    setModifyInfo(u);
  }

  const changeDOBHandler = (e) => {
    const u = { ...modifyInfo };
    u.DOB = e.target.value;
    setModifyInfo(u);
  }
  const status = (item) => {
    if (item.IsDraw) {
      return "Draw";
    } else {
      if (item.WinnerID == props.id) {
        return "Win";
      } else {
        return "Loser";
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const changeGenderHandler = (e) => {
    const u = { ...modifyInfo };
    u.Gender = e.target.selectedIndex;
    setModifyInfo(u);
  }

  const SaveChangeHandler = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const r = await UserService.UpdateProfile(info.ID, user.ID, modifyInfo.Name, modifyInfo.DOB, modifyInfo.Email, modifyInfo.Gender);
    setUpdating(false);
  }

  const onImageChange = async (e) => {
    let formdata = new FormData();
    formdata.append("image", e.target.files[0]);
    const data = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: "Client-ID 9c1b3e51b2b1904",
      },
      body: formdata,
    });
    const obj = await data.json();
    // console.log(obj.data.deletehash);
    const temp = await UserService.ChangeAvatar(info.ID, obj.data.link);
    setImg(obj.data.link);
  };
  const renderRecent = () =>
    five && five.map((item) => {
      return (
        <>
          <a href={`/battles/${item.ID}`}>
            {"\t" + `(${item.Row},${item.Col})` + "\t" + status(item)}{" "}
          </a>
          <br />
        </>
      );
    });
  return (
    !info && !modifyInfo ? <Spinner animation="border" className="mx-auto" style={{ display: "block", marginTop: "30px" }} /> : <div className="container emp-profile">

      <div className="row">
        <div className="col-md-4">
          <div className="profile-img">
            <img src={img} alt="" />
            <div className="file btn btn-lg btn-primary">
              Change Photo
                <input type="file" name="file" onChange={onImageChange} />
            </div>
          </div>
          <div className="profile-work">
            <p>Recent (5 Battles)</p>
            {renderRecent()}
            {/* 10 tran gan nhat */}
            {/* <a href="">Website Link</a>
              <br />
              <a href="">Bootsnipp Profile</a>
              <br />
              <a href="">Bootply Profile</a> */}
            {/* <p>SKILLS</p> */}
            {/* <a href="">Web Designer</a>
              <br />
              <a href="">Web Developer</a>
              <br />
              <a href="">WordPress</a>
              <br /> */}
            {/* <a href="">WooCommerce</a>
              <br />
              <a href="">PHP, .Net</a>
              <br /> */}
            <br />
            <button type="button" className="btn btn-info">
              <a href={`/profile/${user.ID}/battles`}> Show More</a>
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="profile-head">
            <h5>{info.Username}</h5>
            <h6>{info.Name}</h6>
            <p className="proile-rating">
              Score : <span>{info.Score}</span>
            </p>
            <></>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  About
                  </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Achievements
                  </a>
              </li>
            </ul>
          </div>
          <div className="tab-content profile-tab" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <form onSubmit={SaveChangeHandler}>


                <div className="row">
                  <div className="col-md-6">
                    <label>User Id</label>
                  </div>
                  <div className="col-md-6">
                    <p>{info.Username}</p>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      onChange={changeNameHandler}
                      name="msg"
                      value={modifyInfo && modifyInfo.Name}
                      className="form-control"
                      placeholder="Type a message"
                    />

                  </div>
                </div>
                <div className="row my-2">
                <div className="col-md-6">
                    <label>Gender</label>
                  </div>
                  <div className="col-md-6">
                    <select class="custom-select" id="inputGroupSelect01" onChange={changeGenderHandler} >
                      {modifyInfo && genders.map((type, index) => {
                        return (
                          <option
                            key={index}
                            value={type}
                            selected={index == modifyInfo.Gender}
                          >
                            {type}
                          </option>
                        );
                      })
                      }
                    </select>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-6">
                    <label>DOB</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      onChange={changeDOBHandler}
                      name="msg"
                      value={modifyInfo && modifyInfo.DOB}
                      className="form-control"
                      placeholder="Type a message"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      readOnly
                      //onChange={changeEmailHandler}
                      name="msg"
                      value={modifyInfo && modifyInfo.Email}
                      className="form-control"
                      placeholder="Type a message"
                    />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-6">
                    <button disabled={updating} type="submit" className="btn btn-primary" >
                      Save changes
                      <Spinner
                        hidden={!updating}
                        as="span"
                        animation="border"
                        size="sm"
                        className="mx-1"
                        role="status"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                </div>
              </form>
            </div>

            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="row">
                <div className="col-md-6">
                  <label>Score</label>
                </div>
                <div className="col-md-6">
                  <p>{info.Score}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Win rate</label>
                </div>
                <div className="col-md-6">
                  <p>
                    {info.WinBattle /
                      (info.WinBattle + info.DrawBattle + info.DefeatBattle)}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Total</label>
                </div>
                <div className="col-md-6">
                  <p>
                    {info.WinBattle + info.DrawBattle + info.DefeatBattle}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div className="col-md-2">
          {/* <input
              type="button"
              className="btn btn-primary"
              onClick={handleBanned}
              name="btn"
              value={!Boolean(banned) ? "Banned" : "Unbanned"}
            /> */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">

        </div>
        <div className="col-md-8">
        </div>
      </div>

    </div>
  );
}

export default UserInfo;
