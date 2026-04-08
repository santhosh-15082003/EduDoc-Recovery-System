// package com.example.documenthub.service;

// import com.example.documenthub.entity.DocumentRequest;
// import com.example.documenthub.entity.DocumentRequestDetails;
// import com.example.documenthub.entity.User;
// import com.example.documenthub.repository.DocumentRequestRepository;
// import com.example.documenthub.repository.DocumentRequestDetailsRepository;
// import com.example.documenthub.dto.DocumentRequestViewDTO;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// public class DocumentRequestService {

//     @Autowired
//     private DocumentRequestRepository documentRequestRepository;

//     @Autowired
//     private DocumentRequestDetailsRepository documentRequestDetailsRepository;

//     @Autowired
//     private EmailService emailService;

//     // ✅ Create request
//     public DocumentRequest createRequest(DocumentRequest request) {
//         DocumentRequest saved = documentRequestRepository.save(request);

//         try {
//             emailService.sendEmail(
//                 request.getUser().getEmail(),
//                 "Document Request Created",
//                 "Your request for " + request.getDocumentType() + " has been created."
//             );
//         } catch (Exception e) {
//             e.printStackTrace();
//         }

//         return saved;
//     }

//     // ✅ SAVE FULL FORM JSON
//     public void saveFullForm(DocumentRequest request, Object fullFormObject) {
//         try {
//             ObjectMapper mapper = new ObjectMapper();
//             String json = mapper.writeValueAsString(fullFormObject);

//             DocumentRequestDetails details = new DocumentRequestDetails();
//             details.setRequest(request);
//             details.setFormData(json);

//             documentRequestDetailsRepository.save(details);

//         } catch (Exception e) {
//             throw new RuntimeException("Failed to save full form data", e);
//         }
//     }

//     public List<DocumentRequest> getAllRequests() {
//         return documentRequestRepository.findAll();
//     }

//     public List<DocumentRequest> getRequestsByUser(User user) {
//         return documentRequestRepository.findByUser(user);
//     }

//     public DocumentRequest updateRequestStatus(Long requestId, String status) {
//         DocumentRequest request = documentRequestRepository.findById(requestId)
//                 .orElseThrow(() -> new RuntimeException("Request not found"));

//         request.setStatus(status.toUpperCase());
//         DocumentRequest updated = documentRequestRepository.save(request);

//         try {
//             emailService.sendEmail(
//                 request.getUser().getEmail(),
//                 "Request Status Updated",
//                 "Your request status is now " + status.toUpperCase()
//             );
//         } catch (Exception e) {
//             e.printStackTrace();
//         }

//         return updated;
//     }

//     public Optional<DocumentRequest> findById(Long id) {
//         return documentRequestRepository.findById(id);
//     }

//     public String getFullFormData(Long requestId) {
//     return documentRequestDetailsRepository
//             .findByRequestId(requestId)
//             .map(d -> d.getFormData())
//             .orElseThrow(() -> new RuntimeException("Form data not found"));
//     }

//     public DocumentRequestViewDTO getRequestView(Long id) {
//         return documentRequestRepository.findRequestViewById(id);
//     }


// }


package com.example.documenthub.service;

import com.example.documenthub.entity.DocumentRequest;
import com.example.documenthub.entity.DocumentRequestDetails;
import com.example.documenthub.entity.User;
import com.example.documenthub.repository.DocumentRequestRepository;
import com.example.documenthub.repository.DocumentRequestDetailsRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DocumentRequestService {

    @Autowired
    private DocumentRequestRepository requestRepository;

    @Autowired
    private DocumentRequestDetailsRepository detailsRepository;

    private final ObjectMapper mapper = new ObjectMapper();

    // CREATE REQUEST
    public DocumentRequest createRequest(DocumentRequest request) {
        return requestRepository.save(request);
    }

    // SAVE FULL FORM JSON
    public void saveFullForm(DocumentRequest request, Object form) {
        try {
            DocumentRequestDetails details = new DocumentRequestDetails();
            details.setRequest(request);
            details.setFormData(mapper.writeValueAsString(form));
            detailsRepository.save(details);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save form", e);
        }
    }

    public List<DocumentRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public List<DocumentRequest> getRequestsByUser(User user) {
        return requestRepository.findByUser(user);
    }

    public Optional<DocumentRequest> findById(Long id) {
        return requestRepository.findById(id);
    }

    public DocumentRequest updateRequestStatus(Long id, String status) {
        DocumentRequest req = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus(status);
        return requestRepository.save(req);
    }

    // ✅ THIS RETURNS ALL FORM FIELDS
    public Map<String, Object> getFullForm(Long requestId) {
        try {
            String json = detailsRepository.findByRequestId(requestId)
                    .orElseThrow(() -> new RuntimeException("Form not found"))
                    .getFormData();

            return mapper.readValue(json, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});

        } catch (Exception e) {
            throw new RuntimeException("Failed to read form data", e);
        }
    }
}
