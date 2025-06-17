
package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.model.DestinationDetails;

@Repository
public interface DestinationDetailRepository  extends JpaRepository< DestinationDetails, Long> {
    

}
