package com.codecrafter.service;

import com.codecrafter.entity.MyUser;
import com.codecrafter.entity.dto.MyUserDto;

public interface IMyUserService {

    MyUser registerUser(MyUser myUser);

    boolean isLogin(String email,String password);


}
