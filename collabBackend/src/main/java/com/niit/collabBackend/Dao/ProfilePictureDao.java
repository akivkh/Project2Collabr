package com.niit.collabBackend.Dao;

import com.niit.collabBackend.model.ProfilePicture;

public interface ProfilePictureDao {

	public void save(ProfilePicture profilePicture);
	public ProfilePicture getProfilePicture(String loginname);
}
