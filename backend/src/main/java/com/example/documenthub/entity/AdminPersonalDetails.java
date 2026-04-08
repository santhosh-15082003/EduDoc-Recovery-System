package com.example.documenthub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "admin_personal_details")
public class AdminPersonalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;  // linked to admin login username
    private String name;
    private int age;
    private String gender;
    private String address;
    private String mailId;
    private String contactNo;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getMailId() { return mailId; }
    public void setMailId(String mailId) { this.mailId = mailId; }

    public String getContactNo() { return contactNo; }
    public void setContactNo(String contactNo) { this.contactNo = contactNo; }
}
