package com.example.documenthub.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "personal_details", uniqueConstraints = @UniqueConstraint(columnNames = "username"))
public class PersonalDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username; // map to logged-in username

    private String name;
    private Integer age;
    private String gender;
    @Column(length = 1000)
    private String address;
    private String mailId;
    private String contactNo;

    // Constructors
    public PersonalDetails() {}

    public PersonalDetails(String username, String name, Integer age, String gender,
                           String address, String mailId, String contactNo) {
        this.username = username;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.address = address;
        this.mailId = mailId;
        this.contactNo = contactNo;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getMailId() { return mailId; }
    public void setMailId(String mailId) { this.mailId = mailId; }

    public String getContactNo() { return contactNo; }
    public void setContactNo(String contactNo) { this.contactNo = contactNo; }
}
