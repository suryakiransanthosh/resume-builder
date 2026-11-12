import { ResumeDocument } from "./ResumeDocument";
import type { ResumeData } from "../types";

type Props = {
  data: ResumeData;
  onEdit: () => void;
};

export function ResumePreview({ data, onEdit }: Props) {
  const handlePrint = () => window.print();

  return (
    <div className="preview-layout">
      <div className="preview-toolbar no-print">
        <button type="button" className="btn-secondary" onClick={onEdit}>
          ← Edit answers
        </button>
        <button type="button" className="btn-primary" onClick={handlePrint}>
          Download PDF
        </button>
      </div>
      <p className="print-hint no-print">
        Use &quot;Download PDF&quot; then choose <strong>Save as PDF</strong> in the print dialog.
      </p>
      <div className="resume-sheet">
        <ResumeDocument data={data} />
      </div>
    </div>
  );
}
