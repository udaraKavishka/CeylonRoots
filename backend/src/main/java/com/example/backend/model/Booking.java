package com.example.backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String customerName;
	    private String customerEmail;
	    private String bookingDate;
	    private String travelPackageId;
	    private String status; 

	    @ManyToOne
	    @JoinColumn(name = "package_id")
	    private TravelPackage travelPackage;

	    @ManyToMany
	    @JoinTable(
	        name = "booking_components",
	        joinColumns = @JoinColumn(name = "booking_id"),
	        inverseJoinColumns = @JoinColumn(name = "component_id")
	    )
	    private List<TravelComponent> bookedComponents ;

		public Booking(Long id, String customerName, String customerEmail, String bookingDate, String travelPackageId,
				String status, List<TravelComponent> bookedComponents) {
			super();
			this.id = id;
			this.customerName = customerName;
			this.customerEmail = customerEmail;
			this.bookingDate = bookingDate;
			this.travelPackageId = travelPackageId;
			this.status = status;
			this.bookedComponents = bookedComponents;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getCustomerName() {
			return customerName;
		}

		public void setCustomerName(String customerName) {
			this.customerName = customerName;
		}

		public String getCustomerEmail() {
			return customerEmail;
		}

		public void setCustomerEmail(String customerEmail) {
			this.customerEmail = customerEmail;
		}

		public String getBookingDate() {
			return bookingDate;
		}

		public void setBookingDate(String bookingDate) {
			this.bookingDate = bookingDate;
		}

		public String getTravelPackageId() {
			return travelPackageId;
		}

		public void setTravelPackageId(String travelPackageId) {
			this.travelPackageId = travelPackageId;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public List<TravelComponent> getBookedComponents() {
			return bookedComponents;
		}

		public void setBookedComponents(List<TravelComponent> bookedComponents) {
			this.bookedComponents = bookedComponents;
		}
	    
	    
}
