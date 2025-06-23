package tat.serviceimpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tat.model.Technician;
import tat.repository.TechnicianRepository;
import tat.service.TechnicianService;

import java.util.List;

@Service
public class TechnicianServiceImpl implements TechnicianService {

    @Autowired
    private TechnicianRepository technicianRepository;

    @Override
    public Technician saveTechnician(Technician technician) {
        return technicianRepository.save(technician);
    }

    @Override
    public List<Technician> getTechniciansByRegion(String region) {
        return technicianRepository.findByRegion(region);
    }

    @Override
    public Technician getTechnicianById(Long id) {
        return technicianRepository.findById(id).orElse(null);
    }

	@Override
	public List<Technician> getAllTechnicians() {
		// TODO Auto-generated method stub
		return technicianRepository.findAll();
	}
}
