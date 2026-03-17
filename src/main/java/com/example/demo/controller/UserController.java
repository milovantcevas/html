package com.example.demo.controller;

import com.example.demo.repository.model.UserEntity;
import com.example.demo.repository.model.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserInfo>> getUsers() {
        List<UserEntity> users = userRepository.findAll();
        List<UserInfo> resultUsers = new ArrayList<>();
        for (UserEntity user : users) {
            resultUsers.add(new UserInfo(user.getId(), user.getFirstName(), user.getLastName(), user.getAge()));
        }

        return ResponseEntity.ok(resultUsers);
    }

    @PostMapping("/users")
    public ResponseEntity<UserInfo> createUser(@RequestBody UserInfo userInfo) {
        UserEntity savedUser = userRepository.save(new UserEntity(userInfo.getFirstName(), userInfo.getLastName(), userInfo.getAge()));
        return ResponseEntity.ok(new UserInfo(savedUser.getId(), savedUser.getFirstName(), savedUser.getLastName(), savedUser.getAge()));

    }

    @DeleteMapping("/users")
    public ResponseEntity<Void> deleteUser() {
        userRepository.deleteAll();
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/lastname")
    public ResponseEntity<Void> updateAllLastnames(){
        List<UserEntity> users = userRepository.findAll();
        for(UserEntity user : users){
            user.setLastName("Milovantcev");
        }
        userRepository.saveAll(users);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/firstname")
    public ResponseEntity<Void> updateAllFirstnames(){
        List<UserEntity> users = userRepository.findAll();
        for(UserEntity user : users){
            user.setFirstName("Arseniy");
        }
        userRepository.saveAll(users);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/age")
    public ResponseEntity<Void> updateAllAge(){
        List<UserEntity> users = userRepository.findAll();
        for(UserEntity user : users){
            user.setAge(100L);
        }
        userRepository.saveAll(users);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUsersById(@PathVariable ("userId") Long userId){
        userRepository.deleteById(userId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<Void> updateUser(@PathVariable Long userId, @RequestBody UserInfo userInfo) {
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        user.setAge(userInfo.getAge());
        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
