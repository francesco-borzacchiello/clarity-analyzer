import base64
from typing import Dict, Tuple
import cv2
import numpy as np

from config import ChartProcessorConfig
from interfaces import LabelExtractor, LegendExtractor, ContourProcessor, JSONFormatter, ValueExtractor

# Main Coordinator
class ChartProcessor:
    def __init__(
        self,
        label_extractor: LabelExtractor,
        legend_extractor: LegendExtractor,
        contour_processor: ContourProcessor,
        value_extractor: ValueExtractor,
        json_formatter: JSONFormatter
    ):
        self.label_extractor = label_extractor
        self.legend_extractor = legend_extractor
        self.contour_processor = contour_processor
        self.value_extractor = value_extractor
        self.json_formatter = json_formatter

    def __annotate_image(self, image: np.ndarray, labels: list, contours: list, legend_items) -> str:
        """
        Crea un'immagine annotata con le etichette e i contorni e la converte in base64.
        """
        debug_image = self.__create_annotated_image(image, labels, contours, legend_items)
        _, buffer = cv2.imencode('.png', debug_image)
        debug_image_base64 = base64.b64encode(buffer).decode('utf-8')
        return debug_image_base64

    def __create_annotated_image(self, image: np.ndarray, labels: list, contours: list, legend_items) -> np.ndarray:
        """
        Crea un'immagine annotata con le etichette e i contorni.
        """
        debug_image = image.copy()

        # Draw labels
        for label in labels:
            x, y, w, h = label['position']
            cv2.rectangle(debug_image, (x, y), (x + w, y + h), (255, 0, 0), 2)
            cv2.putText(debug_image, label['text'], (x, y - 5),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)

        # Draw contours
        for contour in contours:
            cv2.drawContours(debug_image, [contour], -1, (0, 255, 0), 2)

        for legend_item in legend_items:
            if legend_item['bounding_box'] is not None:
                x, y, w, h = legend_item['bounding_box']
                cv2.rectangle(debug_image, (x, y), (x + w, y + h), (0, 0, 255), 2)

        return debug_image

    def process_image(self, image_bytes: bytes) -> Dict:
        """
        Processo principale per elaborare un'immagine e restituire i risultati in formato JSON.
        """
        image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)

        # Step 1: Extract labels
        labels = self.label_extractor.extract_labels(image)

        # Step 2: Get and process contours
        contours = self.contour_processor.get_contours(image)

        # Step 3: Associate labels to contours
        associations = self.contour_processor.associate_labels_to_contours(labels, contours)

        # Step 4: Extract legend
        legend_items = self.legend_extractor.extract_legend(image)

        # Step 5: Extract values
        results = self.value_extractor.extract_values_from_bars(image, associations, legend_items)

        # Step 6: Ensure all labels are present in results
        label_keys = {label['text'] for label in labels}
        result_keys = {result['label'] for result in results}

        missing_labels = label_keys - result_keys

        for missing_label in missing_labels:
            results.append({
                'label': missing_label,
                'legend_item': None,
                'value': None
            })

        json_results = {
            'data': self.json_formatter.prepare_json(results),
            'processed_image':self.__annotate_image(image, labels, contours, legend_items)
        }
        # Step 7: Format JSON
        return json_results

