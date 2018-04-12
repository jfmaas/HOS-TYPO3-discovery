<?php
defined('TYPO3_MODE') || die('Access denied.');

call_user_func(
    function () {
        \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
            'MyVendor.StoreInventory',
            'Pi1',
            [
                'StoreInventory' => 'list',
            ],
            // non-cacheable actions
            [
                'StoreInventory' => '',
            ]
        );
    }
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('<INCLUDE_TYPOSCRIPT: source="FILE:EXT:schaufenster/Configuration/TSconfig/ContentElementWizard.tsconfig">');
