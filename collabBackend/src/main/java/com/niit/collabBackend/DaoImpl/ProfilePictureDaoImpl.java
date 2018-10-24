package com.niit.collabBackend.DaoImpl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.niit.collabBackend.Dao.ProfilePictureDao;
import com.niit.collabBackend.model.ProfilePicture;

@Repository("profilePictureDao")
public class ProfilePictureDaoImpl implements ProfilePictureDao {

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Transactional
	public void save(ProfilePicture profilePicture) {
		
		System.out.println("Profile Loginname: "+profilePicture.getLoginname());
		Session session=sessionFactory.openSession();
		session.save(profilePicture);
		
	}

	@Override
	public ProfilePicture getProfilePicture(String loginname) {
		
		Session session=sessionFactory.openSession();
		ProfilePicture profilePictue=(ProfilePicture)session.get(ProfilePicture.class, loginname);
		return profilePictue;
	}

}
