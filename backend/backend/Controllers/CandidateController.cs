using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Candidate;
using backend.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        public ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto dto, IFormFile coverletterPdfFile, IFormFile resumePdfFile)
        {
            // Save pdf to server => Save url into Entity
            var fiveMegaByte = 5 * 1024 * 1024;
            var pdfMimeType = "application/pdf";

            if (coverletterPdfFile.Length > fiveMegaByte || coverletterPdfFile.ContentType != pdfMimeType)
            {
                return BadRequest("File is not valid");
            }
            if (resumePdfFile.Length > fiveMegaByte || resumePdfFile.ContentType != pdfMimeType)
            {
                return BadRequest("File is not valid");
            }

            var coverletterUrl = Guid.NewGuid().ToString() + ".pdf";
            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
            var filePathForCoverLetter = Path.Combine(Directory.GetCurrentDirectory(), "documents", "coverletter", coverletterUrl);
            var filePathForResume = Path.Combine(Directory.GetCurrentDirectory(), "documents", "resume", resumeUrl);

            using (var stream = new FileStream(filePathForCoverLetter, FileMode.Create))
            {
                await coverletterPdfFile.CopyToAsync(stream);
            }
            using (var stream = new FileStream(filePathForResume, FileMode.Create))
            {
                await resumePdfFile.CopyToAsync(stream);
            }

            Candidate newCandidate = _mapper.Map<Candidate>(dto);
            newCandidate.CoverLetterURL = coverletterUrl;
            newCandidate.ResumeURL = resumeUrl;
            await _context.Candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();

            return Ok("Candidate Created Successfully");
        }
        // Read
        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidates()
        {
            var candidates = await _context.Candidates.Include(c => c.Job).ToListAsync();
            var convertedCandidates = _mapper.Map<IEnumerable<CandidateGetDto>>(candidates);

            return Ok(convertedCandidates);
        }

        // Download PDF File
        [HttpGet]
        [Route("download/coverletter/{url}")]
        public IActionResult DownloadCoverLetterPdfFile(string url)
        {
            var filePathForCoverLetter = Path.Combine(Directory.GetCurrentDirectory(), "documents", "coverletter", url);
            if (!System.IO.File.Exists(filePathForCoverLetter))
            {
                return NotFound("File Not Found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePathForCoverLetter);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }

        [HttpGet]
        [Route("download/resume/{url}")]
        public IActionResult DownloadResumePdfFile(string url)
        {
            var filePathForCoverLetter = Path.Combine(Directory.GetCurrentDirectory(), "documents", "resume", url);
            if (!System.IO.File.Exists(filePathForCoverLetter))
            {
                return NotFound("File Not Found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePathForCoverLetter);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }
    }
}
