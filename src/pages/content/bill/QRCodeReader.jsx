import React, { useState, useRef, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

const QRCodeReader = ({ handleScan, handleError }) => {
    const [isCameraConnected, setIsCameraConnected] = useState(true);
    const qrReaderRef = useRef(null);

    useEffect(() => {
        return () => {
            stopStream();
        };
    }, []);

    const stopStream = () => {
        if (qrReaderRef.current) {
            qrReaderRef.current.halt();
            setIsCameraConnected(false); // Đặt lại trạng thái kết nối camera
        }
    };

    return (
        <div>
            {isCameraConnected && (
                <QrReader
                    ref={qrReaderRef}
                    onResult={(result, error) => {
                        if (result) {
                            handleScan(result.text);
                            stopStream(); // Ngừng kết nối camera khi quét thành công
                        }
                        if (error) {
                            handleError(error);
                        }
                    }}
                    onError={handleError}
                    style={{ width: '100%' }}
                />
            )}
        </div>
    );
};

export default QRCodeReader;
